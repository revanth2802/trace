CREATE TABLE `access_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`actor` text NOT NULL,
	`at` text NOT NULL,
	`reference` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workpapers` (
	`id` text PRIMARY KEY NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`data` text NOT NULL
);
