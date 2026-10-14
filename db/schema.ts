import { pgTable, text, integer, jsonb, timestamp, index } from 'drizzle-orm/pg-core';
export const workpapers = pgTable('workpapers', { id: text('id').primaryKey(), revision: integer('revision').notNull().default(0), data: jsonb('data').notNull() });
export const accessLogs = pgTable('access_logs', { id: text('id').primaryKey(), actor: text('actor').notNull(), at: timestamp('at', { withTimezone: true }).notNull(), reference: text('reference').notNull() }, table => [index('access_logs_at_idx').on(table.at)]);
