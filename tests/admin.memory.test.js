import request from 'supertest';
import app from '../app.js';
import fs from 'fs';
import { expect } from 'chai';

describe('Admin', async () => {

    let regularUserToken;
    let adminUserToken;

    const bodyRegularJWT = {
        email: 'rubenfs@blockbuster.com',
        password: '1234'
    };

    const bodyAdminJWT = {
        email: 'admin@blockbuster.com',
        password: 'admin'
    };

    before(async () => {

        // Getting a regular user token
        await request(app)
            .post('/signin')
            .send(bodyRegularJWT)
            .expect(res => {
                const body = res.body;
                regularUserToken = body.token;
            });

        // Getting a admin token 
        await request(app)
            .post('/signin')
            .send(bodyAdminJWT)
            .expect(res => {
                const body = res.body;
                adminUserToken = body.token;
            });
    });

    describe('GET /admin/user/', () => {


        it('should return all users', async () => {

            const users = JSON.parse(fs.readFileSync('./tests/data/users.json'));
            const totalUsers = Object.keys(users).length;

            await request(app)
                // .get('/admin/user/?admin=true&user=true')
                .get('/admin/user/')
                .set('Authorization', 'Bearer ' + adminUserToken)
                .query({ admin: true, user: true })
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    expect(body.length).to.equal(totalUsers);
                });
        });

        it('should return admin users', async () => {

            const users = JSON.parse(fs.readFileSync('./tests/data/users.json'));
            const totalAdminUsers = Object.values(users).filter(user => user.role === 'ADMIN').length;

            await request(app)
                .get('/admin/user/?admin=true&user=false')
                .set('Authorization', 'Bearer ' + adminUserToken)
                .expect(200)
                .expect(res => {
                    const body = res.body;
                    expect(body.length).to.equal(totalAdminUsers);
                });
        });

        it('should denied to retrieve users', async () => {

            const code = 'You are not authorized';

            await request(app)
                .get('/admin/user/?admin=true&user=true')
                .set('Authorization', 'Bearer ' + regularUserToken)
                .expect(403)
                .expect(res => {
                    const body = res.body;
                    expect(body.message).to.equal(code);
                });
        });
    });
});