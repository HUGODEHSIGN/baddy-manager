import { pgTable, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  username: text('username'),
  courtId: text('courtId'),
});

export const location = pgTable('location', {
  id: text('id').primaryKey(),
  name: text('name'),
});
export type Location = typeof location.$inferSelect;
