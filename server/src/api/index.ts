import { locationRoutes } from '@/server/api/location';
import Elysia from 'elysia';

export const apiRoutes = new Elysia({ prefix: '/api' }).use(locationRoutes);