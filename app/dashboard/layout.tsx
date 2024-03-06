"use client";
import React, { useEffect } from "react";
import { useProjectName } from "@/components/util";
import { useTypedSelector, useAppDispatch } from "@/app/store/store";
import {
  fetchAllData,
  selectError,
  selectLoading,
  selectTodo,
  selectSelectProject,
  setSelectProject,
} from "../store/slice";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const dispatch = useAppDispatch();
    const isLoading = useTypedSelector(selectLoading);
    const error = useTypedSelector(selectError);

  useEffect(() => {
    dispatch(fetchAllData());
  }, []);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && !error && <div className="w-full">{children}</div>}
    </>
  );
}
