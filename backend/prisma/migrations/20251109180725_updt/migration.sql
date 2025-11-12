/*
  Warnings:

  - Added the required column `gender` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "user_profiles" ADD COLUMN     "gender" "Gender" NOT NULL;
