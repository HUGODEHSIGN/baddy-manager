import * as relations from '@/server/drizzle/relations';
import * as schema from '@/server/drizzle/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
const client = new Client({
  connectionString: process.env.DB_URL,
});

console.log(schema);

await client.connect();
export const db = drizzle(client, { schema: { ...schema, ...relations } });
