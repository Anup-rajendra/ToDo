"use client";
import BodyContent from "@/components/Bodycontent";
import React, { useEffect, useState, useContext } from "react";
import DropDown from "@/components/Dropdown";
import UserInfo from "@/components/Userinfo";
import Link from "next/link";
import { SquareUserRound } from "lucide-react";
import { store, useAppDispatch, useTypedSelector } from "../store/store";
import { Provider } from "react-redux";
import {
  fetchAllData,
  selectError,
  selectLoading,
  selectTodo,
    selectSelectProject,
  setSelectProject,
} from "../store/slice";
import { useProjectName, useTotalTaskName } from "@/components/util";
 
const Page = () => {

  const dispatch = useAppDispatch();
  const todo = useTypedSelector(selectTodo);
  const isLoading = useTypedSelector(selectLoading);
  const error = useTypedSelector(selectError);
  const selectProject = useTypedSelector(selectSelectProject);
  const projectNames = useProjectName();
  const totalTasks = useTotalTaskName();
  useEffect(() => {
    dispatch(fetchAllData());
    console.log(todo, isLoading, error);
  }, []);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && !error && (
        <div className="flex flex-row">
          <div className="flex w-1/4 flex-col gap-2 bg-primary-foreground min-h-screen">
            <div>
              <div className="pb-7">
                <UserInfo />
              </div>
              <Link href="/dashboard/profile">
                <div className="pl-4 flex items-center">
                  <div>
                    <SquareUserRound />
                  </div>
                  <div className="pl-2">Profile</div>
                </div>
              </Link>
              <div className="mt-8">
                <DropDown projectName={projectNames} NoOfTasks={totalTasks} />
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <BodyContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
