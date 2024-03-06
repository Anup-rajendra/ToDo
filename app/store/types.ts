import { TasksData } from "../api/maintask/route";

export interface State {
  toDo: UserData;
  loading: boolean;
  error: string | null;
  selectProject: string;
  selectSection: string;
  selectSubTaskMainId: string;
}
 export interface UserData {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  projects: ProjectData[];
}
 export interface UserDataPartial {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}
export interface ProjectData {
  id: string;
  name: string;
  sections: SectionData[];
  totalTasks: number;
}

export interface SectionData {
  id: string;
  name: string;
  mainTasks: MainTaskData[];
  totalSectionTasks:number;
}
export interface SectionPartialData{
  id:string;
  name:string;
  totalSectionTasks:number;
}

export interface MainTaskData {
  id: string;
  name: string;
  completed: boolean;
  subtasks: SubtaskData[];
  subtaskCount: number;
  completedSubtaskCount: number;
}
export interface SubtaskData {
  id: string;
  name: string;
  completed: boolean;
}
export interface AddTaskDetails{
  mainTaskId:string;
  mainName:string;
  mainCompleted:boolean;
  subTaskId:string;
  subtaskName:string;
  subCompleted?:boolean;
}

 export interface TotalTaskType {
   project_id:string;
   total_tasks: number;
   total_section_tasks:number;
 }
 export interface SectionTaskType {
   section_id: string;
   section_task_count: number;
 }

 