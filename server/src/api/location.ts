import { location } from '@/schema';
import { XataHttpDatabase } from '@xata.io/drizzle';
import Elysia from 'elysia';

export const locationRoutes = new Elysia({ prefix: '/locations' }).get(
  '/',
  async ({ db }: { db: XataHttpDatabase<Record<string, never>> }) =>
    await db.select().from(location).execute()
);
