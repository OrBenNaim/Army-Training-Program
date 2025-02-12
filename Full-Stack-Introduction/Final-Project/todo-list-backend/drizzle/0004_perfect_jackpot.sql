ALTER TABLE "todos" DROP CONSTRAINT "todos_title_user_unique";--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_title_user_unique" UNIQUE("title","user_id");