import { createPool } from 'mysql2/promise';
import 'dotenv/config';


const pool = createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    waitForConnections: true,
    connectionLimit: 5,
});

pool.getConnection()
.then(connection => {
    pool.releaseConnection(connection);
    console.log('Conexion con DB Clever');
})
.catch(err => {
    console.error('Error conexion DB Clever:', err);
});


export default pool;
