import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  State,
  SubtaskData,
  MainTaskData,
  SectionData,
  ProjectData,
  UserData,
  TotalTaskType,
  SectionTaskType,
} from "./types";

import { RootState } from "./store";
import { TasksData } from "../api/maintask/route";
import { AddTaskDetails } from "./types";
export const initialState: State = {
  toDo: { id: "", // or any default value
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    projects: []},
  loading: false,
  error: null,
  selectProject:"",
  selectSection:"",
  selectSubTaskMainId:"",
};

export const fetchAllData = createAsyncThunk("users/fetch", async () => {
  const response = await fetch("http://localhost:3000/api/reduxstate");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
});

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    setSelectProject: (state, action: PayloadAction<string>) => {
      state.selectProject = action.payload;
    },
    setSelectSection: (state, action: PayloadAction<string>) => {
      state.selectSection = action.payload;
    },
    setSelectSubTaskMainId: (state, action: PayloadAction<string>) => {
      state.selectSubTaskMainId = action.payload;
    },
    setSubTasks: (state, action: PayloadAction<SubtaskData>) => {
        console.log("Before:",state.toDo);
      console.log(state.selectProject,state.selectSection,state.selectSubTaskMainId)
      const updatedProjects:ProjectData[] = state.toDo.projects.map((project) => {
        if (project.name === state.selectProject) {
            console.log("In Project")
          const updatedSections:SectionData[] = project.sections.map((section) => {
            if (section.id === state.selectSection ) {
               console.log("In Section");
              const updatedMainTasks:MainTaskData[]=section.mainTasks.map((main)=>{
                console.log("In main");
                if(main.id === state.selectSubTaskMainId){
                  const taskInfo=action.payload;
                  const subTask:SubtaskData={
                    id:taskInfo.id,
                    name:taskInfo.name,
                    completed:taskInfo.completed
                  }
                    main.subtasks=main.subtasks.concat(subTask);
                    main.subtaskCount += 1;
                    section.totalSectionTasks += 1;
                    project.totalTasks += 1;
                    
                }
                 return main;
              })
              
              return {
                ...section,
                mainTasks:updatedMainTasks,
              };

            }
          return section
        })
            
        
            return {
              ...project,
              sections:updatedSections,
            };
          
    }
     return project;
  })  
    
      state.toDo = {
        ...state.toDo,
        projects: updatedProjects,
      };    
 console.log("After State update:",state.toDo);
    },
    setMainTasks: (state, action: PayloadAction<AddTaskDetails>) => {
      // console.log("Before:",state.toDo);
      // console.log(state.selectProject,state.selectSection)
      const updatedProjects = state.toDo.projects.map((project) => {
        if (project.name === state.selectProject) {
          // console.log("In Project")
          const updatedSections = project.sections.map((section) => {
            if (section.id === state.selectSection) {
              //  console.log("In Section");
              const taskInfo = action.payload;
              if (!taskInfo.subtaskName) {
                // console.log("In main without subtask")
                const mainTask: MainTaskData = {
                  id: taskInfo.mainTaskId,
                  name: taskInfo.mainName,
                  completed: taskInfo.mainCompleted,
                  subtasks: [],
                  subtaskCount: 0,
                  completedSubtaskCount: 0,
                };
                section.mainTasks = section.mainTasks.concat(mainTask);
                section.totalSectionTasks += 1;
                project.totalTasks += 1;
              } else {
                console.log("In main with subtask");
                const mainTask: MainTaskData = {
                  id: taskInfo.mainTaskId,
                  name: taskInfo.mainName,
                  completed: taskInfo.mainCompleted,
                  subtasks: [
                    {
                      id: taskInfo.subTaskId,
                      name: taskInfo.subtaskName,
                      completed: false,
                    },
                  ],
                  subtaskCount: 1,
                  completedSubtaskCount: 0,
                };
                section.mainTasks = section.mainTasks.concat(mainTask);
                section.totalSectionTasks += 2;
                project.totalTasks += 2;
              }
            }
            // console.log(section);
            return section;
          });
          //  console.log(project);
          return {
            ...project,
            sections: updatedSections,
          };
        }
        return project;
      });

      state.toDo = {
        ...state.toDo,
        projects: updatedProjects,
      };
      // console.log(state.toDo)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.toDo = action.payload;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

 

export const selectTodo = (state: RootState) => state.toDo;
export const selectLoading = (state: RootState) => state.loading;
export const selectError = (state: RootState) => state.error;
export const selectSelectProject = (state: RootState) => state.selectProject;
export const selectSelectSection= (state: RootState) => state.selectSection;
export const selectSelectSubTaskMainId = (state: RootState) =>
  state.selectSubTaskMainId;
export const {setSelectProject,setSelectSection,setMainTasks,setSelectSubTaskMainId,setSubTasks}=toDoSlice.actions;
export default toDoSlice.reducer;
