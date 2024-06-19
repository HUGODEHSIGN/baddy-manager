import { Elysia } from 'elysia';

const userRoutes = new Elysia({ prefix: '/users' }).get('/', () => ({
  data: 'get all',
}));

export default userRoutes;
