import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const workpapers = sqliteTable('workpapers', { id: text('id').primaryKey(), revision: integer('revision').notNull().default(0), data: text('data').notNull() });
export const accessLogs = sqliteTable('access_logs', { id: text('id').primaryKey(), actor: text('actor').notNull(), at: text('at').notNull(), reference: text('reference').notNull() });
