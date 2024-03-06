"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "@/app/store/store";
import {
  fetchAllData,
  selectError,
  selectLoading,
  setSelectProject,
} from "../store/slice";
import { useProjectName, useTotalTaskName } from "@/components/util";
import DropDown from "@/components/Dropdown";
import UserInfo from "@/components/Userinfo";
import Link from "next/link";
import { SquareUserRound } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const isLoading = useTypedSelector(selectLoading);
  const error = useTypedSelector(selectError);
  const projectNames = useProjectName();
  const totalTasks = useTotalTaskName();
  useEffect(() => {
    dispatch(fetchAllData());
    if (projectNames.length > 0) {
      dispatch(setSelectProject(projectNames[0]));
    }
  }, []);

  return (
    <div className="flex flex-row">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && !error && (
        <div className="flex w-1/4 flex-col gap-2 bg-primary-foreground min-h-screen">
          <div>
            <div className="pb-7">
              <UserInfo />
            </div>
            <Link href="/dashboard/profile">
              <div className="pl-4 flex items-center cursor-pointer">
                <SquareUserRound />
                <div className="pl-2">Profile</div>
              </div>
            </Link>
            <div className="mt-8">
              <DropDown projectName={projectNames} NoOfTasks={totalTasks} />
            </div>
          </div>
        </div>
      )}
      <div className="w-full">{children}</div>
    </div>
  );
}
