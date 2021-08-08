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
        const userId = Object.values(users).filter(user => user.email === bodyJWT.email);

        const userOrders = JSON.parse(fs.readFileSync('./tests/data/orders.json'));
        const totalUserOrders = Object.values(userOrders).filter(order => order.user_id === userId[0]._id).length;

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

    // describe('POST /orders', () => {
    //     it('should create an order', async () => {

    //         const movie = await Movie.findOne({ title: 'El infierno de Gabriel Parte 3' });
    //         // const userId = await User.findOne({ email: 'rubenfs@blockbuster.com' });

    //         const newOrder = {
    //             movieId: movie._id
    //         };

    //         await request(app)
    //             .post('/orders')
    //             .send(newOrder)
    //             .set('Authorization', 'Bearer ' + regularUserToken)
    //             .expect(200)
    //             .expect(res => {
    //                 const body = res.body;
    //             });
    //     });
    // });
});