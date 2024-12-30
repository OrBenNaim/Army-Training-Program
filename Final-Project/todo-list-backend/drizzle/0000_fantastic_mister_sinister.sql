CREATE TABLE "toDoLists" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "toDoLists_title_unique" UNIQUE("title")
);
