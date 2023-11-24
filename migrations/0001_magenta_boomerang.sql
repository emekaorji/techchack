CREATE TABLE `public_user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`image` text,
	`role` text,
	`stacks` blob
);
--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `role`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `stacks`;