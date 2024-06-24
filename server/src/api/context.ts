import { db } from '@/server/db';
import { location } from '@/server/drizzle/schema';
import { eq } from 'drizzle-orm';
import Elysia from 'elysia';

export const contextRoutes = new Elysia({ prefix: '/context' }).get(
  '/:locationId',
  async ({ params: { locationId } }) =>
    await db.query.location.findFirst({
      where: eq(location.xata_id, locationId),
      with: {
        courts: {
          with: {
            parties: {
              with: {
                users: true,
              },
            },
          },
        },
      },
    })
);
