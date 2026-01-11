/*
  Warnings:

  - Added the required column `color` to the `task_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task_status" ADD COLUMN     "color" TEXT NOT NULL;
