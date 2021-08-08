import { dbConnect, dbDisconnect, loadMoviesData, loadUsersData } from './_common.js';

import pkg from 'mocha';

const { before, after } = pkg;

before(async () => {
    console.log('##### BEFORE #####');
    dbConnect();
    loadUsersData();
    loadMoviesData();
});

after(async () => {
    console.log('##### AFTER #####');
    dbDisconnect();
});