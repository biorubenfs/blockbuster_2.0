import express from 'express';

import dotenv from 'dotenv';
import connectDatabase from './config/db_connection.js';

import morgan from 'morgan';
import cors from 'cors';

import moviesRoutes from './routes/movies.routes.js';
import signupRoutes from './routes/signup.routes.js';
import userRoutes from './routes/user.routes.js';
import signinRoutes from './routes/signin.routes.js';
import adminRoutes from './routes/admin.routes.js';
import checkJWT from './middlewares/checkJWT.js';
import checkAdmin from './middlewares/checkAdmin.js';

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
app.use('/users', checkJWT, userRoutes);
app.use('/signin', signinRoutes);

// ToDo add checkadmin middleware
app.use('/admin', checkJWT, checkAdmin, adminRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})