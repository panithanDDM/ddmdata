const { Pool } = require('pg');


var { HOSTNAME } = process.env


const pool = new Pool({
    user: 'postgres',
    host: '2403:6200:8917:dfb9:4c55:bbf5:64ef:2631',
    database: 'ddm_iso',
    password: 'remote',
    post: 5432,
});

module.exports = { pool };


// 