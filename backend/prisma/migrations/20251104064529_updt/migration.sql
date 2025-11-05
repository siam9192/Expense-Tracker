/*
  Warnings:

  - You are about to drop the column `isDefault` on the `avatars` table. All the data in the column will be lost.
  - Added the required column `is_default` to the `avatars` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('EXPENSE', 'ENUM');

-- AlterTable
ALTER TABLE "avatars" DROP COLUMN "isDefault",
ADD COLUMN     "is_default" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "user_categories" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "is_hidden" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_categories" ADD CONSTRAINT "user_categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profiles"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
