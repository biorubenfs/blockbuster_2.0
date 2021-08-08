import { MongoMemoryServer as MMS } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import fs from 'fs';
import Bcrypt from 'bcrypt';

import User from '../models/user.model.js';
import Movie from '../models/movie.model.js';
import Order from '../models/order.model.js';

const mongoServer = await MMS.create({ instance: { dbName: 'mocked_ddbb' } });

export const dbConnect = async () => {

    const uri = await mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        dbName: 'mocked_ddbb',
        useCreateIndex: true,
        useUnifiedTopology: true
    };

    await mongoose.connect(uri, mongooseOpts);
};

export const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};

/** LOADING DATA IN MEMORY */

export const loadUsersData = async () => {
    let rawData = fs.readFileSync('./tests/data/users.json');
    let users = JSON.parse(rawData);

    for await (const user of Object.values(users)) {
        const newUser = new User(user);
        if (newUser.role === 'ADMIN') {
            newUser.password = Bcrypt.hashSync('admin', parseInt(process.env.SALT_ROUNDS));
        } else {
            newUser.password = Bcrypt.hashSync('1234', parseInt(process.env.SALT_ROUNDS));
        }

        newUser.save();
    }

    return users;
};

export const loadMoviesData = async () => {
    let rawData = fs.readFileSync('./tests/data/movies.json');
    let movies = JSON.parse(rawData);

    for await (const movie of Object.values(movies)) {
        const newMovie = new Movie(movie);
        newMovie.save();
    }
};

export const loadOrdersData = async () => {
    let rawData = fs.readFileSync('./tests/data/orders.json');
    let orders = JSON.parse(rawData);

    for await (const order of Object.values(orders)) {
        const newOrder = new Order(order);
        newOrder.save();
    }
};

