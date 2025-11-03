/*
  Warnings:

  - You are about to drop the column `name` on the `user_inits` table. All the data in the column will be lost.
  - Made the column `verification_id` on table `user_inits` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."user_inits" DROP CONSTRAINT "user_inits_verification_id_fkey";

-- AlterTable
ALTER TABLE "user_inits" DROP COLUMN "name",
ALTER COLUMN "verification_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user_inits" ADD CONSTRAINT "user_inits_verification_id_fkey" FOREIGN KEY ("verification_id") REFERENCES "otp_verifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
