"use client";
import React, { useEffect, useState } from "react";
import AddTask from "./Addtask";
import SubTasks, { SectionProps } from "./Section";
import { number } from "zod";
import Section from "./Section";
import {
  selectError,
  selectLoading,
  selectTodo,
  selectSelectProject,
  setSelectProject,
} from "@/app/store/slice";
import { useTypedSelector } from "@/app/store/store";
import {  useSectionName } from "./util";
const BodyContent = () => {
  const selectProject= useTypedSelector(selectSelectProject);
  useEffect(() => {}, [selectProject]);
  return (
    <div className="w-[100%]">
      <div className="flex flex-col min-h-screen pl-9 pt-9 gap-6">
        <p className="font-bold text-2xl pl-7">{selectProject}</p>
        <Section sections={useSectionName()} />
      </div>
    </div>
  );
};

export default BodyContent;
