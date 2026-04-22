import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { contactRoutes } from './routes/contact';
import { healthRoutes } from './routes/health';

const app = new Hono();

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000').split(',');

app.use('/*', logger());
app.use('/*', cors({
  origin: allowedOrigins,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.route('/health', healthRoutes);
app.route('/api/contact', contactRoutes);

app.notFound((c) => c.json({ error: 'Not found' }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal server error' }, 500);
});

const port = Number(process.env.PORT ?? 4000);
console.log(`API server running on http://localhost:${port}`);

export default { port, fetch: app.fetch };
