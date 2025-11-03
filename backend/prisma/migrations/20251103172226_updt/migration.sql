/*
  Warnings:

  - Added the required column `flag_svg` to the `countries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "flag_svg" TEXT NOT NULL;
