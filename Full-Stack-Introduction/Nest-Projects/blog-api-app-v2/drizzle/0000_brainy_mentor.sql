CREATE TABLE IF NOT EXISTS "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"content" text,
	CONSTRAINT "blogs_title_unique" UNIQUE("title")
);
