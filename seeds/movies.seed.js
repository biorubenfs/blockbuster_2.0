import mongoose from 'mongoose';
import connectDatabase from '../config/db_connection.js';
import Movie from "../models/movie.model.js";

import fs from 'fs';

import dotenv from 'dotenv';

dotenv.config();

const urlDB = process.env.URL_DB;
const portDB = process.env.PORT_DB;
const nameDB = process.env.NAME_DB;

connectDatabase(urlDB, portDB, nameDB);

mongoose.connection.dropCollection('movies', (err, result) => {
    console.log("*** movies collection deleted ***");
})

// Reading data from json file
let rawData = fs.readFileSync('./seeds/raw_data/movies.json');
let movies = JSON.parse(rawData);

let count = 0;

for (const movie of movies) {
    let movieObject = new Movie(movie);
    await movieObject.save();
    count++;
};

if (count === movies.length) {
    console.log("*** movies planted succesfully ***");
};

mongoose.disconnect()