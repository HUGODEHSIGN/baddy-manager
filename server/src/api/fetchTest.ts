import { db } from '@/server/db';
import Elysia from 'elysia';

export const fetchTestRoutes = new Elysia({ prefix: '/fetchTest' }).get(
  '/',
  async () => await db.query.location.findMany()
);
