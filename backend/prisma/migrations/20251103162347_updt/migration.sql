/*
  Warnings:

  - You are about to drop the column `tow_factor_auth` on the `user_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_settings" DROP COLUMN "tow_factor_auth",
ADD COLUMN     "two_factor_auth" BOOLEAN NOT NULL DEFAULT false;
