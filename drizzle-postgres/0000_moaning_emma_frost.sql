CREATE TABLE "access_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"actor" text NOT NULL,
	"at" timestamp with time zone NOT NULL,
	"reference" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workpapers" (
	"id" text PRIMARY KEY NOT NULL,
	"revision" integer DEFAULT 0 NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE INDEX "access_logs_at_idx" ON "access_logs" USING btree ("at");