const { Pool } = require('pg');

// const {
//     POSTGRES_HOST,
//     POSTGRES_PORT,
//     POSTGRES_DATABASE,
//     POSTGRES_USER,
//     POSTGRES_PASSWORD,
// } = process.env;



// const pool = new Pool({
//     user: 'postgres',
//     password: 'remote',
//     host: '2403:6200:8917:dfb9:4c55:bbf5:64ef:2631',
//     port: 5432,
//     database: 'ddm_iso'
// });

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
});


// pool.connect((err) => {
//     if (err) throw err
//     console.log('Connect data base SS')
// })

module.exports = { pool };


