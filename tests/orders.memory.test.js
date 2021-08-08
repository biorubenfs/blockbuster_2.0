import request from 'supertest';
import app from '../app.js';
import fs from 'fs';

import { expect } from 'chai';
import Movie from '../models/movie.model.js';
import Order from '../models/order.model.js';

describe('Orders', () => {

    let regularUserToken;
    const bodyJWT = {
        email: 'rubenfs@blockbuster.com',
        password: '1234'
    };

    before(async () => {
        await request(app)
            .post('/signin')
            .send(bodyJWT)
            .expect(res => {
                const body = res.body;
                regularUserToken = body.token;
            });
    });

    describe('GET /orders', () => {

        const users = JSON.parse(fs.readFileSync('./tests/data/users.json'));
        const userId = Object.values(users).find(user => user.email === bodyJWT.email)._id;

        const userOrders = JSON.parse(fs.readFileSync('./tests/data/orders.json'));
        const totalUserOrders = Object.values(userOrders).filter(order => order.user_id === userId).length;

        it('should return user orders', async () => {

            await request(app)
                .get('/orders')
                .set('Authorization', 'Bearer ' + regularUserToken)
                .expect(res => {
                    const body = res.body;
                    expect(body).to.have.length(totalUserOrders);
                });
        });
    });

    describe('POST /orders', () => {
        it('should create an order', async () => {

            const movies = JSON.parse(fs.readFileSync('./tests/data/movies.json'));
            const movieId = Object.values(movies).find(movie => movie.title === 'Un amor contra viento y marea')._id;

            const newOrder = {
                movieId: movieId
            };

            await request(app)
                .post('/orders')
                .send(newOrder)
                .set('Authorization', 'Bearer ' + regularUserToken)
                .expect(200)
                .expect(res => {
                    const body = res.body;
                });
        });

        it('should refuse to create an order', async () => {

            const code = 'User has already an active order with that movie';

            const movies = JSON.parse(fs.readFileSync('./tests/data/movies.json'));
            const movieId = Object.values(movies).find(movie => movie.title === 'El infierno de Gabriel Parte 3')._id;

            const newOrder = {
                movieId: movieId
            };

            await request(app)
                .post('/orders')
                .send(newOrder)
                .set('Authorization', 'Bearer ' + regularUserToken)
                .expect(400)
                .expect(res => {
                    const body = res.body;
                    expect(body.message).to.equal(code);
                });
        });
    });
});