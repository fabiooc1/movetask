/*
  Warnings:

  - You are about to drop the column `assignedToUserId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `createdByUserId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assignedToUserId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_createdByUserId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "assignedToUserId",
DROP COLUMN "createdByUserId",
ADD COLUMN     "assignedToId" TEXT,
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
