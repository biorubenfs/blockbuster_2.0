import mongoose from 'mongoose';
import connectDatabase from '../config/db_connection.js';
import Genre from "../models/genre.model.js";

import fs from 'fs';

import dotenv from 'dotenv';

dotenv.config();

const urlDB = process.env.URL_DB;
const portDB = process.env.PORT_DB;
const nameDB = process.env.NAME_DB;

connectDatabase(urlDB, portDB, nameDB);

mongoose.connection.dropCollection('genres', (err, result) => {
    console.log("*** genres collection deleted ***");
})

// Reading data from json file
let rawData = fs.readFileSync('./seeds/raw_data/genres.json');
let genres = JSON.parse(rawData);

let count = 0;

for (const genre of genres) {
    let genreObject = new Genre(genre);
    await genreObject.save();
    count++;
};

if (count === genres.length) {
    console.log("*** genres planted succesfully ***");
};

mongoose.disconnect()