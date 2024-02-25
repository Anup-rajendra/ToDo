-- CreateTable
CREATE TABLE "Project" (
    "project_id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Section" (
    "section_id" SERIAL NOT NULL,
    "section_name" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("section_id")
);

-- CreateTable
CREATE TABLE "Task" (
    "task_id" SERIAL NOT NULL,
    "task_name" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,
    "is_main_task" BOOLEAN NOT NULL DEFAULT false,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_name_key" ON "Project"("project_name");

-- CreateIndex
CREATE UNIQUE INDEX "Section_section_name_key" ON "Section"("section_name");

-- CreateIndex
CREATE UNIQUE INDEX "Task_section_id_is_main_task_task_name_key" ON "Task"("section_id", "is_main_task", "task_name");

-- CreateIndex
CREATE UNIQUE INDEX "Task_section_id_is_main_task_task_name_task_id_key" ON "Task"("section_id", "is_main_task", "task_name", "task_id");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("section_id") ON DELETE RESTRICT ON UPDATE CASCADE;
