import { Pool } from 'pg';

const PORT = process.env.NEXT_PUBLIC_POSTGRES_PORT ? parseInt(process.env.NEXT_PUBLIC_POSTGRES_PORT) : 0;

const pool = new Pool({
    host: process.env.NEXT_PUBLIC_POSTGRES_HOST,
    port: PORT,
    user: process.env.NEXT_PUBLIC_POSTGRES_USER,
    password: process.env.NEXT_PUBLIC_POSTGRES_PASSWORD,
    database: process.env.NEXT_PUBLIC_POSTGRES_DB
});

export default pool;