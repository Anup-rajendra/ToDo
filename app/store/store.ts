import toDoReducer from "./slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: toDoReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Writing these here to prevent defining the types in every file
export const useAppDispatch = () => useDispatch<AppDispatch>(); //This is used to perform action
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
// Used to get the data from the store in the component

export default store;
