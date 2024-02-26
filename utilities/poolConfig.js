// const { Pool } = require('pg');

// const {
//     POSTGRES_HOST,
//     POSTGRES_PORT,
//     POSTGRES_DATABASE,
//     POSTGRES_USER,
//     POSTGRES_PASSWORD,
// } = process.env;

// let pool;

// if (process.env.NODE_ENV === 'production') {
//     pool = new Pool({
//         host: POSTGRES_HOST,
//         port: POSTGRES_PORT,
//         database: POSTGRES_DATABASE,
//         user: POSTGRES_USER,
//         password: POSTGRES_PASSWORD,
//     });
// } else {
//     pool = new Pool({
//         port: 5432,
//         host: '2403:6200:8917:dfb9:4c55:bbf5:64ef:2631',
//         database: 'ddm_iso',
//         password: 'remote',
//         user: 'postgres',
//         port: 5432,
//     });
// }

// pool.connect((err) => {
//     if (err) throw err
//     console.log('Connect data base SS')
// })

// module.exports = { pool };


const { Pool } = require('pg');

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DATABASE,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`

const pool = new Pool({
    connectionString,
});

pool.connect((err) => {
    if (err) throw err;
    console.log('Connected to database SS');
});

module.exports = { pool };