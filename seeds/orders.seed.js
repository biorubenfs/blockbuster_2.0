import mongoose from 'mongoose';
import connectDatabase from '../config/db_connection.js';

import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';
import Order from '../models/order.model.js';

import dotenv from 'dotenv';

dotenv.config();

const urlDB = process.env.URL_DB;
const portDB = process.env.PORT_DB;
const nameDB = process.env.NAME_DB;

connectDatabase(urlDB, portDB, nameDB);

mongoose.connection.dropCollection('orders', (err, result) => {
    console.log('*** orders collection deleted ***');
});

// const query = ['Cadena perpetua', 'La lista de Schindler', 'Your name', 'American History X'];
// const movies = await Movie.find({}).where('title').in(query);

const movie_1 = await Movie.findOne({ title: 'Cadena perpetua' });
const movie_2 = await Movie.findOne({ title: 'La lista de Schindler' });
const movie_3 = await Movie.findOne({ title: 'Your name' });
const movie_4 = await Movie.findOne({ title: 'American History X' });

const user_1 = await User.findOne({ username: 'rubenfs' });
const user_2 = await User.findOne({ username: 'pablocd' });

const orders = [
    new Order({
        user_id: user_1._id,
        movie_id: movie_1._id,
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        status: 'ACTIVE'
    }),
    new Order({
        user_id: user_1._id,
        movie_id: movie_2._id,
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        status: 'ACTIVE'
    }),
    new Order({
        user_id: user_2._id,
        movie_id: movie_3._id,
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        status: 'EXPIRED'
    }),
    new Order({
        user_id: user_2._id,
        movie_id: movie_4._id,
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        status: 'CANCELED'
    })
];

let count = 0;

for (const order of orders) {
    await order.save();
    count++;
}

if (count === orders.length) {
    console.log('*** orders planted succesfully ***');
}

mongoose.disconnect();