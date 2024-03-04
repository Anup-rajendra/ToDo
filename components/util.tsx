import { ProjectData, SectionData } from "@/app/store/types";
import { selectTodo, selectSelectProject } from "@/app/store/slice";
import { useTypedSelector } from "@/app/store/store";

export const useProjectName = () => {
  const todo = useTypedSelector(selectTodo);
  return todo.projects.map((project) => project.name);
};

export const useTotalTaskName = () => {
  const todo = useTypedSelector(selectTodo);
  return todo.projects.map((project) => project.totalTasks);
};

export const useSectionName = (projectName: string | null) => {
  const todo = useTypedSelector(selectTodo);

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
  return sections;
};
