const { Pool } = require('pg');
require('dotenv').config();


// let pool;

// if (process.env.NODE_ENV === 'local') {
//     pool = new Pool({
//         user: 'postgres',
//         password: 'remote',
//         host: '2403:6200:8917:dfb9:4c55:bbf5:64ef:2631',
//         port: 5432,
//         database: 'ddm_iso'
//     });
// } else {
//     pool = new Pool({
//         user: process.env.PG_USER,
//         password: process.env.PG_PASSWORD,
//         host: process.env.PG_HOST,
//         port: process.env.PG_PORT,
//         database: process.env.PG_DATABASE,
//         ssl: true,
//     });
// }

const pool = new Pool({
    user: 'postgres',
    password: 'remote',
    host: '2403:6200:8917:dfb9:4c55:bbf5:64ef:2631',
    port: 5432,
    database: 'ddm_iso'
})

module.exports = { pool };



