import request from 'supertest';
import app from '../app.js';
import fs from 'fs';
import { expect } from 'chai';


describe('Movies', () => {
    it('GET >>> list all movies', async () => {

        const totalMovies = JSON.parse(fs.readFileSync('./seeds/raw_data/movies.json')).length;

        await request(app)
            .get('/movies/')
            .expect(200)
            .expect(res => {
                expect(res.body.length).to.equal(totalMovies);
                expect('Content-Type', /application\/json/);
            });
    });
});

describe('Signup', () => {
    it('POST >>> create a user', async () => {

        const newUser = {
            'username': 'test_user',
            'email': 'test_user@blockbuster.com',
            'password': '1234'
        };

        await request(app)
            .post('/signup')
            .send(newUser)
            .expect(200)
            .expect(res => {
                expect(res.body.username).equal(newUser.username);
                expect(res.body.email).equal(newUser.email);
                expect(res.body.password).not.equal(newUser.password);
            });
    });
});

describe.only('Signin', () => {
    it('POST >>> do login', async () => {

        const user = {
            'email': 'rubenfs@blockbuster.com',
            'password': '1234',
        };

        await request(app)
            .post('/signin')
            .send(user)
            .expect(200)
            .expect(res => console.log(res.body));
    });
});