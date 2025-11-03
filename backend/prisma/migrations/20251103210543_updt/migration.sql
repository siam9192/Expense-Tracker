/*
  Warnings:

  - You are about to drop the column `currency_id` on the `wallets` table. All the data in the column will be lost.
  - You are about to drop the column `monthly_budget` on the `wallets` table. All the data in the column will be lost.
  - Added the required column `currency_id` to the `user_settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."wallets" DROP CONSTRAINT "wallets_currency_id_fkey";

-- AlterTable
ALTER TABLE "user_settings" ADD COLUMN     "currency_id" INTEGER NOT NULL,
ADD COLUMN     "monthly_budget" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "currency_id",
DROP COLUMN "monthly_budget",
ALTER COLUMN "total_balance" SET DEFAULT 0,
ALTER COLUMN "total_balance" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "spendable_balance" SET DEFAULT 0,
ALTER COLUMN "spendable_balance" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "saving_balance" SET DEFAULT 0,
ALTER COLUMN "saving_balance" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
