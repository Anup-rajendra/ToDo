export interface RootState {
  todo: UserDetails[];
}

export interface UserDetails {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  project: ProjectDetails[];
}

export interface ProjectDetails {
  project_id: number;
  project_name: string;
  total_tasks: number;
  sections: SectionDetails[];
}

export interface SectionDetails {
  section_id: number;
  section_name: string;
  total_section_tasks: number;
  task: TaskDetails[];
}
export interface TaskDetails {
  task_id: number;
  task_name: string;
  parent_task_id: number;
  section_id: number;
  is_main_task: boolean;
  is_completed: boolean;
  subtask_count: number;
  completed_subtask_count: number;
}
