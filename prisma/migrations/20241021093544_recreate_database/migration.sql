/*
  Warnings:

  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `posts`;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `category` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `publishedAt` DATE NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `Post_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
