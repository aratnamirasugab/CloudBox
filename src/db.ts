import {Pool} from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
});

pool.on('connect', () => {
    console.log('connected to the db');
});

pool.on('error', (err) => {
    console.error('error to connect to the db', err);
    process.exit(-1);
});

export default pool;