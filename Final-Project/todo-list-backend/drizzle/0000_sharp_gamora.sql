CREATE TABLE "ToDoLists" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"completed" boolean NOT NULL,
	CONSTRAINT "toDoLists_title_unique" UNIQUE("title")
);
