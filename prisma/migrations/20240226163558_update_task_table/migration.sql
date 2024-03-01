/*
  Warnings:

  - A unique constraint covering the columns `[section_id,is_main_task,parent_task_id,task_name]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Task_section_id_is_main_task_task_name_key";

-- DropIndex
DROP INDEX "Task_section_id_is_main_task_task_name_task_id_key";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "parent_task_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Task_section_id_is_main_task_parent_task_id_task_name_key" ON "Task"("section_id", "is_main_task", "parent_task_id", "task_name");
