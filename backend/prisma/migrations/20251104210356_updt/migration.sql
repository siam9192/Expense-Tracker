-- CreateEnum
CREATE TYPE "BalanceUpdateType" AS ENUM ('SPENDABLE', 'SAVING');

-- CreateEnum
CREATE TYPE "BalanceUpdateResource" AS ENUM ('USER_ADJUSTMENT', 'TRANSACTION', 'GOAL_DEPOSIT', 'GOAL_WITHDRAW');

-- CreateTable
CREATE TABLE "balance_updates" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reason" VARCHAR(150) NOT NULL,
    "prev_balance" DOUBLE PRECISION NOT NULL,
    "new_balance" DOUBLE PRECISION NOT NULL,
    "change_amount" DOUBLE PRECISION NOT NULL,
    "balance_type" "BalanceUpdateType" NOT NULL,
    "resource" "BalanceUpdateResource" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "balance_updates_pkey" PRIMARY KEY ("id")
);
