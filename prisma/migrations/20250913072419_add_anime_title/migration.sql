/*
  Warnings:

  - Added the required column `animeTitle` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."comments" ADD COLUMN     "animeTitle" TEXT NOT NULL;
