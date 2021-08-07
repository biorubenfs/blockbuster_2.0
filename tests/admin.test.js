import request from 'supertest';
import app from '../app.js';
import fs from 'fs';
import { expect } from 'chai';
// import { beforeAll, afterAll } from 'mocha';
import { MongoMemoryServer as MMS } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import pkg from 'mocha';

const { before, after } = pkg;

import User from '../models/user.model.js';


const mongoServer = await MMS.create({ instance: { dbName: 'mocked_ddbb' } });

const dbConnect = async () => {
    await mongoose.connect(mongoServer.getUri(), {
        useNewUrlParser: true,
        dbName: 'mocked_ddbb',
        useCreateIndex: true,
        useUnifiedTopology: true
    });
};

const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};

before(async () => {
    console.log('##### BEFORE #####');
    dbConnect();
    const newUser = new User({
        'username': 'adminMocked',
        'email': 'adminMocked@blockbuster.com',
        'password': '1234',
        'role': 'ADMIN'
    });
    await newUser.save();
});

after(async () => {
    console.log('##### AFTER #####');
    dbDisconnect();
});


describe('ADMIN', async () => {

    it('/admin/user/[admin=true][user=true]', async () => {

        const newUser = await User.find();
        console.log(newUser);

        await request(app)
            .get('/admin/user/?admin=true&user=false')
            .expect(res => {
                const body = res.body;
                console.log(body);
            });
    });
});