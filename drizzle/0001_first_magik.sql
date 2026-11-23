PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` text DEFAULT '2026-11-16T05:59:11.229Z'
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "title", "content", "createdAt") SELECT "id", "title", "content", "createdAt" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;