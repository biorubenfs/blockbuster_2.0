import request from 'supertest';
import app from '../../app.js';

import { expect } from 'chai';
import Movie from '../../models/movie.model.js';

import jwt from 'jsonwebtoken';

describe('Orders', () => {

    let regularUserToken;
    let jwtPayload;

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
                jwtPayload = jwt.decode(regularUserToken);
            });
    });

    describe('GET /orders', () => {

        it('should return user orders', async () => {

            // const totalUserOrders = await Order.find({ user_id: regularUserToken.id });
            // console.log(totalUserOrders);

            await request(app)
                .get('/orders')
                .set('Authorization', 'Bearer ' + regularUserToken)
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    expect(body).to.have.length(2);
                });
        });
    });

    describe('POST /orders', () => {
        it('should create an order', async () => {

            const movie = await Movie.findOne({ title: 'El infierno de Gabriel Parte 3' });
            // const userId = await User.findOne({ email: 'rubenfs@blockbuster.com' });

            const newOrder = {
                movieId: movie._id
            };

            await request(app)
                .post('/orders')
                .send(newOrder)
                .set('Authorization', 'Bearer ' + regularUserToken)
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    expect(body.status).to.equal('ACTIVE');
                    expect(body.user_id).to.equal(jwtPayload.id);
                    expect(body.movie_id).to.equal(String(movie._id));
                });
        });
    });
});