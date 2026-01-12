/*
  Warnings:

  - You are about to drop the column `taskStatusId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_taskStatusId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "taskStatusId",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "task_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
