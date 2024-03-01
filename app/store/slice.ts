import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RootState,
  UserDetails,
  ProjectDetails,
  SectionDetails,
  TaskDetails,
} from "./types";

export const initialState: RootState = {
  todo: [],
};

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    addSubTaskDetails(
      state,
      action: PayloadAction<{
        subTaskId: number;
        sectionId: number;
        subTaskName: string;
        parentTaskId: number;
      }>
    ) {
      const { subTaskId, sectionId, subTaskName, parentTaskId } =
        action.payload;
      const toDo = state.todo;
      const updatedToDo = toDo.map((user) => ({
        ...user,
        project: user.project.map((project) => ({
          ...project,
          sections: project.sections.map((section) => ({
            ...section,
            task: section.task.map((task) => {
              // Check if the current task has the specified subTaskId
              if (task.task_id === subTaskId) {
                return {
                  ...task,
                  task_id: subTaskId,
                  task_name: subTaskName,
                  section_id: sectionId,
                  is_completed: false,
                  is_main_task: false,
                  parent_task_id: parentTaskId,
                };
              }
              return task; // If not the task we want to update, return unchanged
            }),
          })),
        })),
      }));
    },
  },
});

export const { addSubTaskDetails } = toDoSlice.actions;

export const selectChatState = (state: RootState) => state.todo;

export default toDoSlice.reducer;
