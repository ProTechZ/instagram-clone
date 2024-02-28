import pg from 'pg';
const { PG_USER, PG_HOST, PG_DB, PG_PASSWORD, PG_PORT } = process.env;
const pool = new pg.Pool({
    user: PG_USER,
    host: PG_HOST,
    database: PG_DB,
    password: PG_PASSWORD,
    port: parseInt(PG_PORT),
});
export default pool;
