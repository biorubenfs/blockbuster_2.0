import request from 'supertest';
import app from '../app.js';
import fs from 'fs';
import { expect } from 'chai';

describe('Movies', () => {

    describe('GET /movies', () => {
        it('should list all movies', async () => {

            const moviesList = JSON.parse(fs.readFileSync('./tests/data/movies.json'));

            const totalMovies = Object.keys(moviesList).length;

            await request(app)
                .get('/movies/')
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    expect(body.length).to.equal(totalMovies);
                });
        });
    });
});