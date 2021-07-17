import express from 'express';

import dotenv from 'dotenv';
import connectDatabase from './config/db_connection.js';

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

app.get('/', (req, res) => {
    res.json({ message: "content" })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})