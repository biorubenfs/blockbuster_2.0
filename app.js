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

import { orderController } from './controllers/order.controller.js';

// Init dotenv
dotenv.config();

// APP port
const port = process.env.PORT;

// Database
const urldb = process.env.URL_DB;
const portdb = process.env.PORT_DB;
const namedb = process.env.NAME_DB;

connectDatabase(urldb, portdb, namedb);

// Initialize Express
const app = express();

// Tracking endpoints with morgan
app.use(morgan((tokens, req, res) => [
    new Date().toDateString(),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res)
].join(' ')));

// Able to receive JSON on body request
app.use(express.json());
app.use(cors());

// Master routes
app.use('/signup', signupRoutes)
app.use('/movies', moviesRoutes);
app.use('/user', checkJWT, userRoutes);
app.use('/signin', signinRoutes);
app.use('/orders', checkJWT, orderRoutes)

// admin routes
app.use('/admin', checkJWT, checkAdmin, adminRoutes);

// cron job to change order status
cron.schedule('* 23 * * *', orderController.cronUpdatedOrder);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})