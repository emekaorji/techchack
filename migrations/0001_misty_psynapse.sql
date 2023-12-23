DROP TABLE `public_user`;--> statement-breakpoint
ALTER TABLE stack ADD `shortDescription` text;--> statement-breakpoint
ALTER TABLE stack ADD `expires` integer;--> statement-breakpoint
ALTER TABLE stack ADD `creators` text;--> statement-breakpoint
ALTER TABLE user ADD `role` text;--> statement-breakpoint
ALTER TABLE user ADD `description` text;--> statement-breakpoint
ALTER TABLE user ADD `twitterUrl` text;--> statement-breakpoint
ALTER TABLE user ADD `linkedinUrl` text;--> statement-breakpoint
ALTER TABLE user ADD `githubUrl` text;--> statement-breakpoint
ALTER TABLE user ADD `company` text;--> statement-breakpoint
ALTER TABLE user ADD `location` text;--> statement-breakpoint
ALTER TABLE user ADD `joinedDate` integer;--> statement-breakpoint
ALTER TABLE user ADD `phone` text;--> statement-breakpoint
ALTER TABLE user ADD `interests` text;--> statement-breakpoint
ALTER TABLE user ADD `pronouns` text;--> statement-breakpoint
ALTER TABLE user ADD `stacks` blob;--> statement-breakpoint
ALTER TABLE user ADD `publicFields` text;