import { contextRoutes } from '@/server/api/context';
import { fetchTestRoutes } from '@/server/api/fetchTest';
import Elysia from 'elysia';

export const apiRoutes = new Elysia({ prefix: '/api' })
  .use(contextRoutes)
  .use(fetchTestRoutes);
