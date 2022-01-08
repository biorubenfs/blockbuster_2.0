import request from 'supertest';
import app from '../app.js';
import fs from 'fs';
import { expect } from 'chai';

describe('Movies', () => {

    describe('GET /movies', () => {
        it('should list 10 movies', async () => {

            const moviesList = JSON.parse(fs.readFileSync('./tests/data/movies.json'));

            const totalMovies = Object.keys(moviesList).length;

            await request(app)
                .get('/movies?page=1&limit=10')
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    expect(body.movies.length).to.equal(totalMovies);
                });
        });

        it('should return a movie', async () => {

            const moviesList = JSON.parse(fs.readFileSync('./tests/data/movies.json'));

            const movieId = moviesList['movie_01']._id;

            await request(app)
                .get(`/movies/${movieId}`)
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    expect(body._id).to.equal(movieId);
                });

        });
    });
});