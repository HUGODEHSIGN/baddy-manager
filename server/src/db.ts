import * as schema from '@/server/schema';
import { getXataClient } from '@/server/xata'; // Generated client
import { drizzle } from 'drizzle-orm/xata-http';
const xata = getXataClient();
export const db = drizzle(xata, { schema });
