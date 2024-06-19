import staticPlugin from '@elysiajs/static';
import { Elysia } from 'elysia';
import userRoutes from './api/user';
import { db } from './db';

const app = new Elysia()
  .decorate('db', db)
  .group('/api', (app) => app.use(userRoutes))
  .use(staticPlugin({ assets: 'client/dist', prefix: '/' }))
  .get('/', () => Bun.file('client/dist/index.html'))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
