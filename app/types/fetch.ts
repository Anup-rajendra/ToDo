import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import MainTasks from './../../components/Maintasks';

import {
  SubtaskData,
  MainTaskData,
  SectionData,
  ProjectData,
  UserData,
  TotalTaskType,
  SectionTaskType,
} from "../store/types";

export const fetchDataDetails = async (): Promise<UserData | null> => {
  const session = await getServerSession(authOptions);
  const user_id = Number(session?.user.id);

  const dataDetails: any[] = await db.$queryRaw`
    SELECT
      u.id as user_id,
      u.username,
      u.firstname,
      u.lastname,
      u.email,
      p.project_id,
      p.project_name,
      s.section_id,
      s.section_name,
      t.task_id AS main_task_id,
      t.task_name AS main_task_name,
      t.is_completed AS main_task_completed,
      st.task_id AS subtask_id,
      st.task_name AS subtask_name,
      st.is_completed AS subtask_completed,
      (
        SELECT COUNT(*)::integer
        FROM "Task" AS sub
        WHERE sub.parent_task_id = t.task_id
      ) AS subtask_count,
      (
        SELECT COUNT(*)::integer
        FROM "Task" AS sub
        WHERE sub.parent_task_id = t.task_id and sub.is_completed=true
      ) As completed_subtask_count
    FROM "User" u
    LEFT JOIN "Project" p ON p.user_id = u.id
    LEFT JOIN "Section" s ON s.project_id = p.project_id
    LEFT JOIN "Task" t ON t.section_id = s.section_id  and t.is_main_task is true
    LEFT JOIN "Task" st ON st.parent_task_id = t.task_id
    WHERE u.id = ${user_id}
      ORDER BY
    p.project_id,
    s.section_id,
    t.task_id,
    st.task_id 
  `;

    const totalTask: TotalTaskType[] = await db.$queryRaw`
      SELECT
      p.project_id AS project_id,
        COUNT(DISTINCT t.task_id)::integer + COUNT(DISTINCT st.task_id)::integer AS total_tasks,
        COUNT(DISTINCT s.section_id)::integer AS section_count
      FROM
        "Project" p 
      LEFT JOIN  
        "Section" s ON  p.project_id =s.project_id
      LEFT JOIN
        "Task" t ON s.section_id = t.section_id AND t.is_main_task = true
      LEFT JOIN
        "Task" st ON t.task_id = st.parent_task_id
        GROUP BY P.project_id
        ORDER By p.project_id
     
    `;
     const sectionTasks:SectionTaskType[]=await db.$queryRaw`SELECT
    s.section_id,
    s.section_name,
    COUNT(t.task_id)::integer AS section_task_count
FROM
    "Section" s
LEFT JOIN
    "Task" t ON s.section_id = t.section_id
GROUP BY
    s.section_id, s.section_name
ORDER BY
    s.section_id`;
    
  

  if (dataDetails.length === 0) {
    return null; // User not found
  }

  const structuredDetails: UserData = {
    id: dataDetails[0].user_id,
    username: dataDetails[0].username,
    firstname: dataDetails[0].firstname,
    lastname: dataDetails[0].lastname,
    email: dataDetails[0].email,
    projects: [],
  };

  dataDetails.forEach((row) => {
    addProject(structuredDetails, row, totalTask,sectionTasks);
  });
 
  return structuredDetails;
};

  function addProject(user: UserData, row: any, totalTask: TotalTaskType[],sectionTasks:SectionTaskType[]) {
    const existingProject = user.projects.find((p) => p.id === row.project_id);

    if (!existingProject) {
      const newProject: ProjectData = {
        id: row.project_id,
        name: row.project_name,
        sections: [],
        totalTasks: 0,
      };
      user.projects.push(newProject);
    }

    const project = user.projects.find((p) => p.id === row.project_id);

    if (project && row.section_id !== null) {
      addSection(project, row,sectionTasks);
    
      // Find the corresponding totalTasks for the current project
      const projectTotalTasks = totalTask.find(
        (t) => t.project_id === row.project_id
        
      );
     
      if (projectTotalTasks && projectTotalTasks.total_tasks > 0) {
        // Update totalTasks for the project
        project.totalTasks = projectTotalTasks.total_tasks || 0;
      }
    }
  }
function addSection(project: ProjectData, row: any,sectionTasks:SectionTaskType[]): void {
  const existingSection = project.sections.find((s) => s.id === row.section_id);

  if (!existingSection) {
    const newSection: SectionData = {
      id: row.section_id,
      name: row.section_name,
      mainTasks: [],
      totalSectionTasks: 0,
    };
    project.sections.push(newSection);
  }

  const section = project.sections.find((s) => s.id === row.section_id);


  const sectionTotalTasks = sectionTasks.find(
        (s) => s.section_id === row.section_id
      );
      
    if (section && row.main_task_id !== null) {
      addMainTask(section, row);

      if (sectionTotalTasks && sectionTotalTasks.section_task_count > 0) {
        // Update totalTasks for the project
        section.totalSectionTasks = sectionTotalTasks.section_task_count || 0;
      }
    }
   
}




function addMainTask(section: SectionData, row: any): void {
  const existingMainTask = section.mainTasks.find(
    (mt) => mt.id === row.main_task_id
  );

  if (!existingMainTask) {
    const mainTask: MainTaskData = {
      id: row.main_task_id,
      name: row.main_task_name,
      completed: row.main_task_completed,
      subtasks: [],
      subtaskCount: row.subtask_count,
      completedSubtaskCount:row.completed_subtask_count
    };
    section.mainTasks.push(mainTask);
  }

  const updatedMainTask = section.mainTasks.find(
    (mt) => mt.id === row.main_task_id
  );

  if (updatedMainTask && row.subtask_id) {
    const subtask: SubtaskData = {
      id: row.subtask_id,
      name: row.subtask_name,
      completed: row.subtask_completed,
       
    };
    updatedMainTask.subtasks.push(subtask);
  }
}
  