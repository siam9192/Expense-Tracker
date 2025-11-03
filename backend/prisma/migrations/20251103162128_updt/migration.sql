/*
  Warnings:

  - You are about to drop the column `monthly_budget` on the `user_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_settings" DROP COLUMN "monthly_budget";

-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "monthly_budget" INTEGER NOT NULL DEFAULT 0;
