import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const db_url = process.env.DATABASE_URL;
export default defineConfig({
	out: './drizzle',
	schema: './src/lib/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: db_url!
	}
});
