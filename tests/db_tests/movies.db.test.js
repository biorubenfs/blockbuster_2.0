import request from 'supertest';
import app from '../../app.js';
import fs from 'fs';
import { expect } from 'chai';

describe('Movies', () => {

    describe('GET /movies', () => {
        it('should list 10 movies', async () => {

            // const moviesList = JSON.parse(fs.readFileSync('./seeds/raw_data/movies.json'));
            // const moviesList = JSON.parse(fs.readFileSync('./seeds/raw_data/movies.json'));

            // const totalMovies = moviesList.length;

            await request(app)
                .get('/movies?page=1&limit=10')
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    // console.log(body);
                    expect(body.movies.length).to.equal(10);
                    // expect('Content-Type', /application\/json/);
                });
        });
    });
});