import { MainTaskData, ProjectData, SectionData, UserData,SubtaskData } from "@/app/store/types";
import { selectTodo, selectSelectProject } from "@/app/store/slice";
import { useTypedSelector } from "@/app/store/store";
import { TasksData } from "@/app/api/maintask/route";

export const useProjectName = () => {
  const todo = useTypedSelector(selectTodo);
  return todo.projects.map((project) => project.name);
};

export const useTotalTaskName = () => {
  const todo = useTypedSelector(selectTodo);
  return todo.projects.map((project) => project.totalTasks);
};

export const useSectionName = () => {
  const todo = useTypedSelector(selectTodo);
  const projectName=useTypedSelector(selectSelectProject)

  if (!projectName) {
    console.log("Project name is null or undefined.");
    return [];
  }

const sections = todo.projects
  .filter((p) => p.name === projectName)
  .flatMap((p) => p.sections) // Using flatMap directly
  .map((section) => ({
    section_id: section.id,
    section_name: section.name,
    total_section_tasks: section.totalSectionTasks,
  }));
  console.log(sections);
  return sections;
};
export const useMainTaskDetails = (sectionName: string | null) => {
  const projectName = useTypedSelector(selectSelectProject);
  const todo:UserData = useTypedSelector(selectTodo);
   if (!sectionName || !projectName) {
     return [];
   }
   const project = todo.projects.find((p) => p.name === projectName);
   if (!project) {
     return [];  
   }

    const sections: SectionData[] = project.sections;
    const section: SectionData | undefined = sections.find(
      (s) => s.name === sectionName
    );
    if (!section) {
      return []; // or handle the case when the section is not found
    }
    const mainTasks: MainTaskData[] = section.mainTasks;
   const transformedMainTasks: TasksData[] = mainTasks.map((mainTask) => ({
     task_id: mainTask.id, // Assuming task_id is a string in TasksData
     task_name: mainTask.name,
     is_completed: mainTask.completed,
     subtask_count: mainTask.subtaskCount,
     completed_subtask_count: mainTask.completedSubtaskCount,
   }));

   return transformedMainTasks;

};
export const useSubTaskDetails = (sectionId:number,mainTaskIden:string) => {
  const projectName = useTypedSelector(selectSelectProject);
  const todo: UserData = useTypedSelector(selectTodo);
  const mainTaskId=Number(mainTaskIden);
  if (!sectionId || !projectName) {
    return [];
  }
  const project = todo.projects.find((p) => p.name === projectName);
  if (!project) {
    return [];
  }

  const sections: SectionData[] = project.sections;
  const section: SectionData | undefined = sections.find(
    (s) => s.id === sectionId
  );
  if (!section) {
    return []; // or handle the case when the section is not found
  }
   
  const mainTasks:MainTaskData[]= section.mainTasks;
  const mainTask:MainTaskData|undefined=mainTasks.find((m)=>m.id===Number(mainTaskId))
  if(!mainTask){
    return [];
  }
  const subtask:SubtaskData[]=mainTask.subtasks;
 
  const transformedSubTasks:SubtaskData[]=subtask.map((s)=>({
    id:s.id,
    name:s.name,
    completed:s.completed,
  }));
  return transformedSubTasks;
  
};
