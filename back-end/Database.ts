import mysql2 from 'mysql2/promise';
import knex from 'knex';
const db = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Wzy19970612',
        database: 'myDatabase'
    }
});

export default db;
