const { Pool } = require('pg');


// var { HOSTNAME } = process.env


// const pool = new Pool({
//     user: 'postgres',
//     host: '2403:6200:8917:dfb9:4c55:bbf5:64ef:2631',
//     database: 'ddm_iso',
//     password: 'remote',
//     post: 5432,
// });

// module.exports = { pool };


// const { Pool } = require('pg');

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DATABASE,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

const pool = new Pool({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    database: POSTGRES_DATABASE,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    ssl: true,
    keepAlive: true,
    idleTimeoutMillis: 3000,
})