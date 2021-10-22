import request from 'supertest';
import app from '../../app.js';
import fs from 'fs';
import { expect } from 'chai';

describe('Signup', () => {

    describe('POST /signup', () => {
        it('should create a user', async () => {

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
                    const body = res.body;
                    expect(body.username).equal(newUser.username);
                    expect(body.email).equal(newUser.email);
                    expect(body.password).not.equal(newUser.password);
                });
        });
        it('should refuse to create the user: duplicate user', async () => {

            const errorMessage = 'User already exists';

            /* This email is already used in ddbb*/
            const user = {
                'username': 'rubenfs',
                'email': 'rubenfs@blockbuster.com',
                'password': '1234',
            };

            await request(app)
                .post('/signup')
                .send(user)
                .expect(409)
                .expect(res => {
                    const body = res.body;
                    expect(body.message).equal(errorMessage);
                });
        });
        it('should refuse to create the user: no password provided', async () => {

            // const errorMessage = 'Username, email and password are required';
            const errorMessage = 'Body validation error';


            // This body doesn't have all fields required
            const user = {
                'username': 'test_user2',
                'email': 'test_user2@blockbuster.com',
            };

            await request(app)
                .post('/signup')
                .send(user)
                .expect(400)
                .expect(res => {
                    const body = res.body;
                    expect(body.message).equal(errorMessage);
                });
        });
    });
});