import { db } from "@/lib/db";
export interface UserDataDetails {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export interface ProjectDataDetails {
  project_id: number;
  project_name: string;
  total_tasks: number;
}

export interface SectionDataDetails {
  section_id: number;
  section_name: string;
  total_section_tasks: number;
}
export interface TaskDataDetails {
  task_id: number;
  task_name: string;
  parent_task_id: number;
  is_main_task: boolean;
  is_completed: boolean;
  subtask_count: number;
  completed_subtask_count: number;
}
export const fetchUserDetails = async () => {
  const userDetails: UserDataDetails[] = await db.$queryRaw`
 Select  username,firstname,lastname,email from "User"`;
  return userDetails;
};

export const fetchProjectDetails = async () => {
  const projectsDetails: ProjectDataDetails[] = await db.$queryRaw`SELECT
    project_id,
    project_name,
    (
    SELECT COUNT(*)::integer 
    FROM "Task"
    WHERE section_id IN (SELECT section_id FROM "Section" WHERE project_id = p.project_id)
    ) AS "total_tasks"
    FROM "Project" p`;
  return projectsDetails;
};

export const fetchSectionDetails = async () => {
  const sectionDetails: SectionDataDetails[] = await db.$queryRaw`
        SELECT "Task".section_id,"Section".section_name, COUNT(*)::integer As total_section_tasks
        FROM "Section"
        JOIN "Task" ON "Section".section_id = "Task".section_id
        JOIN "Project" ON "Section".project_id = "Project".project_id
        GROUP BY "Section".section_name, "Task".section_id`;
  return sectionDetails;
};

export const fetchTaskDetails = async () => {
  const subTasksDetails: TaskDataDetails[] = await db.$queryRaw`
            SELECT
    task_id,
    task_name,
    section_id,
    parent_task_id,
    is_main_task,
    is_completed,
    (
        SELECT COUNT(*)::integer
        FROM "Task" AS sub
        WHERE sub.parent_task_id = "Task".task_id
    ) AS subtask_count,
    (
        SELECT COUNT(*)::integer
        FROM "Task" AS sub
        WHERE sub.parent_task_id = "Task".task_id and sub.is_completed is true
    ) AS completed_subtask_count
    FROM "Task";
        `;
  return subTasksDetails;
};
