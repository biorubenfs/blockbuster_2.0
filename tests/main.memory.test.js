import { dbConnect, dbDisconnect, loadMoviesData, loadOrdersData, loadUsersData } from './_common.js';

import pkg from 'mocha';

const { before, after } = pkg;

before(async () => {
    console.log('>>> Starting tests...');
    dbConnect();
    loadUsersData();
    loadMoviesData();
    loadOrdersData();
});

after(async () => {
    console.log('Test are finished');
    dbDisconnect();
});