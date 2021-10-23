import { expect } from 'chai';
import request from 'supertest';
import app from '../../app.js';

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

        it('should list all admin users', async () => {

            // Just one admin user is created with seeds
            const numAdminUsers = 1;

            await request(app)
                .get('/admin/user/?admin=true&user=false')
                .set('Authorization', 'Bearer ' + adminUserToken)
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    expect(body.length).to.equal(numAdminUsers);
                });
        });
    });
});