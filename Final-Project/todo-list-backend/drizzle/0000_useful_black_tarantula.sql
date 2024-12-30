CREATE TABLE "ToDoLists" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"completed" boolean DEFAULT false,
	CONSTRAINT "toDoLists_title_unique" UNIQUE("title")
);
