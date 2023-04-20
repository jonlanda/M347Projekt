const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'mysecretpassword',
    host: '172.19.0.2',
    database: 'mydb',
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    pool.end();
});
