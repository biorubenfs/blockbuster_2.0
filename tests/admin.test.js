import request from 'supertest';
import app from '../app.js';
import fs from 'fs';
import { expect } from 'chai';

describe('ADMIN', async () => {

    it('/admin/user/[admin=true][user=true]', async () => {

        await request(app)
            .get('/admin/user/?admin=true&user=false')
            .expect(200)
            .expect(res => {
                const body = res.body;
                // console.log(body);
            });
    });

    // it('/movies', async () => {
    //     await request(app)
    //         .get('/movies')
    //         .expect(200);
    //     // .expect(res => console.log(res.body));
    // });
});