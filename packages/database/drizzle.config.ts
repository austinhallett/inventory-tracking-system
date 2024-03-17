import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
    schema: "./src/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        host: process.env.DB_HOST || "127.0.0.1",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_NAME || "ITS",
    },
} satisfies Config;
