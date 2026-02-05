import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'yolausgg',
    password: 'yolausgg',
    database: 'db_petsafe'
});

