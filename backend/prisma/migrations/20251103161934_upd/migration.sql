/*
  Warnings:

  - Changed the type of `currency_id` on the `wallets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."wallets" DROP CONSTRAINT "wallets_currency_id_fkey";

-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "currency_id",
ADD COLUMN     "currency_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
