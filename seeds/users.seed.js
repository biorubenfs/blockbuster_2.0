import mongoose from 'mongoose';
import connectDatabase from '../config/db_connection.js';
import User from '../models/user.model.js';

import Bcrypt from 'bcrypt';

import fs from 'fs';

import dotenv from 'dotenv';

dotenv.config();

const urlDB = process.env.URL_DB;
const portDB = process.env.PORT_DB;
const nameDB = process.env.NAME_DB;

connectDatabase(urlDB, portDB, nameDB);

mongoose.connection.dropCollection('users', (err, result) => {
    console.log('*** users collection deleted ***');
});

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const userPassword = '1234';
const userPasswordHashed = Bcrypt.hashSync(userPassword, saltRounds);

const adminPassword = 'admin';
const adminPasswordHashed = Bcrypt.hashSync(adminPassword, saltRounds);

const rawData = fs.readFileSync('./seeds/raw_data/users.json');
const users = JSON.parse(rawData);

users.forEach(user => {
    if (user.role === 'ADMIN') {
        user.password = adminPasswordHashed;
    } else {
        user.password = userPasswordHashed;
    }
});

let count = 0;

for (const user of users) {
    let userObject = new User(user);
    await userObject.save();
    count++;
}

if (count === users.length) {
    console.log('*** users planted succesfully ***');
}

mongoose.disconnect();