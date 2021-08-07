import request from 'supertest';
import app from '../app.js';
import fs from 'fs';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// before(async () => {
//     const mongoServer = await MongoMemoryServer.create();

//     const uri = mongoServer.getUri();
//     console.log(uri);
// });

describe('Movies', () => {

    describe('GET /movies', () => {
        it('should list all movies', async () => {

            const moviesList = JSON.parse(fs.readFileSync('./seeds/raw_data/movies.json'));
            const totalMovies = moviesList.length;

            await request(app)
                .get('/movies/')
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    expect(body.length).to.equal(totalMovies);
                    expect('Content-Type', /application\/json/);
                });
        });
    });
});