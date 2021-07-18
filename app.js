import express from 'express';

import dotenv from 'dotenv';
import connectDatabase from './config/db_connection.js';

import morgan from 'morgan';

import moviesRoutes from './routes/movies.routes.js';

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


// Master routes
app.use('/movies', moviesRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})