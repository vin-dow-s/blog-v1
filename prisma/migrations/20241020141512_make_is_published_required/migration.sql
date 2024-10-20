/*
  Warnings:

  - Made the column `isPublished` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `posts` MODIFY `isPublished` BOOLEAN NOT NULL DEFAULT false;
