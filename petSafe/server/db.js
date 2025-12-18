import {createPool} from 'mysql2/promise.js';

export const pool = createPool({
    host: 'localhost',
    user: 'yolausgg',
    password: 'yolausgg',
    database: 'db_petsafe'
});

