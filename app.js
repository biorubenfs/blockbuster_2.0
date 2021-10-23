import express from 'express';

import dotenv from 'dotenv';
import connectDatabase from './config/db_connection.js';

import morgan from 'morgan';
import cors from 'cors';
import cron from 'node-cron';

import moviesRoutes from './routes/movies.routes.js';
import signupRoutes from './routes/signup.routes.js';
import userRoutes from './routes/user.routes.js';
import signinRoutes from './routes/signin.routes.js';
import adminRoutes from './routes/admin.routes.js';
import orderRoutes from './routes/order.routes.js';

import checkJWT from './middlewares/checkJWT.js';
import checkAdmin from './middlewares/checkAdmin.js';

// https://www.youtube.com/watch?v=apouPYPh_as&ab_channel=BeyondHelloWorld
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './documentation/swagger.options.js';

import { orderController } from './controllers/order.controller.js';

// Init dotenv
dotenv.config();

// APP port
let port = process.env.PORT;
if (process.env.NODE_ENV === 'test_memory') {
    port = 3001;
}

// Database
let namedb;
const urldb = process.env.URL_DB;
const portdb = process.env.PORT_DB;

process.env.NODE_ENV === 'development'
    ? namedb = process.env.NAME_DB
    : namedb = process.env.NAME_DB_TEST;

if (process.env.NODE_ENV !== 'test_memory') {
    connectDatabase(urldb, portdb, namedb);
}

// Initialize Express
const app = express();

// Tracking endpoints with morgan
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    app.use(morgan((tokens, req, res) => [
        new Date().toDateString(),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res)
    ].join(' ')));
}


// Able to receive JSON on body request
app.use(express.json());
app.use(cors());

// Master routes
app.use('/signup', signupRoutes);
app.use('/movies', moviesRoutes);
app.use('/users', checkJWT, userRoutes);
app.use('/signin', signinRoutes);
app.use('/orders', checkJWT, orderRoutes);

// admin routes
app.use('/admin', checkJWT, checkAdmin, adminRoutes);

// cron job to update order status
cron.schedule('* 23 * * *', orderController.cronUpdatedOrder);

// Initialize de swaggerjs doc AWAIT is mandatory.
const specs = await swaggerJsdoc(swaggerOptions(port));

// Swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Handling errors
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;