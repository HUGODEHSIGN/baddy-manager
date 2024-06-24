import cors from '@elysiajs/cors';
import staticPlugin from '@elysiajs/static';
import { Elysia, t } from 'elysia';

import { apiRoutes } from '@/server/api';

export const app = new Elysia()
  .use(cors())
  .use(apiRoutes)
  .use(staticPlugin({ assets: '../client/dist', prefix: '/' }))
  .get('/', () => Bun.file('../client/dist/index.html'))
  .ws('/socket/:locationId', {
    body: t.Object({
      message: t.String(),
    }),
    response: t.String(),
    open(ws) {
      ws.subscribe(ws.data.params.locationId);
    },
    message(ws, { message }) {
      console.log(message);
      ws.publish(ws.data.params.locationId, message);
    },
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
