import request from 'supertest';
import app from '../../app.js';
import fs from 'fs';
import { expect } from 'chai';

describe('Admin', async () => {

    let adminUserToken;

    const bodyAdminJWT = {
        email: 'admin@blockbuster.com',
        password: 'admin'
    };

    before(async () => {

        // Getting a admin token 
        await request(app)
            .post('/signin')
            .send(bodyAdminJWT)
            .expect(res => {
                const body = res.body;
                adminUserToken = body.token;
            });
    });

    describe('GET /admin/user', () => {

        it('/admin/user/[admin=true][user=true]', async () => {

            await request(app)
                .get('/admin/user/?admin=true&user=false')
                .set('Authorization', 'Bearer ' + adminUserToken)
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    // console.log(body);
                });
        });
    });
});