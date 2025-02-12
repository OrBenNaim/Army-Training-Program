CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "blogs_title_unique" UNIQUE("title")
);
