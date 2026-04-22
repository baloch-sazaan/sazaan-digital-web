import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { dbService } from '../services/db.service';

export const contactRoutes = new Hono();

const contactSchema = z.object({
  first_name: z.string().min(1).max(100),
  last_name:  z.string().min(1).max(100),
  email:      z.string().email(),
  team_size:  z.string(),
  location:   z.string(),
  message:    z.string().min(10).max(5000),
});

contactRoutes.post('/', zValidator('json', contactSchema), async (c) => {
  const body = c.req.valid('json');

  await dbService.saveContactSubmission(body);

  return c.json({ success: true }, 201);
});
