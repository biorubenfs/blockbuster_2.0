import { dbConnect, dbDisconnect, loadMoviesData, loadUsersData } from './_common.js';

import pkg from 'mocha';

const { before, after } = pkg;

before(async () => {
    console.log('>>> Starting tests...');
    dbConnect();
    loadUsersData();
    loadMoviesData();
});

after(async () => {
    console.log('Test are finished');
    dbDisconnect();
});