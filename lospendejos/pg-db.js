const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'mysecretpassword',
    port: 5432,
});

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected');
    }
});

client.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(res.rows);
    }
});
