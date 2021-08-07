import request from 'supertest';
import app from '../app.js';
import fs from 'fs';
import { expect } from 'chai';

describe('Signin', () => {

    describe('POST /signin', () => {
        it('should do the login and return token', async () => {

            const user = {
                'email': 'rubenfs@blockbuster.com',
                'password': '1234',
            };

            await request(app)
                .post('/signin')
                .send(user)
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    expect(body).to.contain.property('token');
                });
        });

        it('should refuse to do the login: Wrong password', async () => {

            const errorMessage = 'Incorrect password or email [password]';

            // password is incorrect
            const user = {
                'email': 'rubenfs@blockbuster.com',
                'password': '12345',
            };

            await request(app)
                .post('/signin')
                .send(user)
                .expect(400)
                .expect(res => {
                    const body = res.body;
                    expect(body.message).equal(errorMessage);
                });
        });

        it('should refuse to do the login: Wrong email', async () => {

            const errorMessage = 'Incorrect password or email [email]';

            // password is incorrect
            const user = {
                'email': 'ruben@blockbuster.com',
                'password': '1234',
            };

            await request(app)
                .post('/signin')
                .send(user)
                .expect(400)
                .expect(res => {
                    const body = res.body;
                    expect(body.message).equal(errorMessage);
                });
        });
    });
});