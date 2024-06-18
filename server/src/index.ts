import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

app.use('*', serveStatic({ root: './client/dist' }));
app.get('*', serveStatic({ path: './client/dist/index.html' }));

console.log('server is running');

export default app;
