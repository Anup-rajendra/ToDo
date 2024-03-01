import { configureStore, Middleware } from "@reduxjs/toolkit";
import toDoReducer, { addSubTaskDetails } from "./slice";

export const store = configureStore({
  reducer: toDoReducer,
});
