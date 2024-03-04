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

export const initialState: State = {
  toDo: { id: 0, // or any default value
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    projects: []},
  loading: false,
  error: null,
  selectProject:null,
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
    setSelectProject: (state, action: PayloadAction<string| null>) => {
      state.selectProject = action.payload;
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
export const {setSelectProject}=toDoSlice.actions;
export default toDoSlice.reducer;
