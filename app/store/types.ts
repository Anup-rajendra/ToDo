export interface State {
  toDo : UserData;
  loading: boolean;
  error: string | null;
  selectProject:string|null;
}
 export interface UserData {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  projects: ProjectData[];
}
export interface ProjectData {
  id: number;
  name: string;
  sections: SectionData[];
  totalTasks: number;
}

export interface SectionData {
  id: number;
  name: string;
  mainTasks: MainTaskData[];
  totalSectionTasks:number;
}

export interface MainTaskData {
  id: number;
  name: string;
  completed: boolean;
  subtasks: SubtaskData[];
  subtaskCount: number;
  completedSubtaskCount: number;
}
export interface SubtaskData {
  id: number;
  name: string;
  completed: boolean;
}

 export interface TotalTaskType {
   project_id:number;
   total_tasks: number;
   total_section_tasks:number;
 }
 export interface SectionTaskType {
   section_id: number;
   section_task_count: number;
 }

 