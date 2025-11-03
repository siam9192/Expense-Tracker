/*
  Warnings:

  - You are about to drop the column `currency_id` on the `user_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_profiles" ALTER COLUMN "profile_picture" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_settings" DROP COLUMN "currency_id";
