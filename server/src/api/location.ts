import { db } from '@/server/db';
import { location } from '@/server/schema';
import { eq } from 'drizzle-orm';
import Elysia from 'elysia';

export const locationRoutes = new Elysia({ prefix: '/locations' })
  // --- Get All ---
  .get('/', async () => await db.select().from(location).execute())
  // --- Get One By Id ---
  .get(
    '/:locationId',
    async ({ params: { locationId } }) =>
      await db
        .select()
        .from(location)
        .where(eq(location.id, locationId))
        .execute()
  );
