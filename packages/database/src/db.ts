import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";

export const params = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

export const connection = postgres(params);

export const db = drizzle(connection);

export default { db, connection };
