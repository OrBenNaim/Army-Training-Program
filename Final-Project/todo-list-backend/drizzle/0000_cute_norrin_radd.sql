CREATE TABLE "ToDoList" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"completed" boolean NOT NULL,
	CONSTRAINT "toDoItems_title_unique" UNIQUE("title")
);
