"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { YellowCircle, GreyCircle } from "./ui/circles";
import Link from "next/link";
import { useAppDispatch, useTypedSelector } from "@/app/store/store";
interface DropDownprojectName {
  projectName: string[];
  NoOfTasks: number[];
}
import {
  selectSelectProject,
  setSelectProject,
} from "@/app/store/slice";
const DropDown: React.FC<DropDownprojectName> = ({
  projectName,
  NoOfTasks,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
   const dispatch = useAppDispatch();
   const selectProject = useTypedSelector(selectSelectProject);
   useEffect(()=>{
    if (projectName.length && !selectedIdx) {
      dispatch(setSelectProject(projectName[0]));
    }
   },[])  
  const handleOnClick = (index: number) => {
      setSelectedIdx(index);
      dispatch(setSelectProject(projectName[index]));
    }
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" showBorder={false}>
        <Link href="/dashboard">
          <AccordionTrigger>Project</AccordionTrigger>
          <AccordionContent>
            {projectName ? (
              Array.isArray(projectName) &&
              projectName.map((content, index) => (
                <div key={content} onClick={() => handleOnClick(index)}>
                  <div className="flex flex-row items-center justify-between py-1 ">
                    <div className="flex flex-row items-center gap-3">
                      {selectedIdx === index ? (
                        <div>
                          <YellowCircle size="h-2.5 w-2.5" />
                        </div>
                      ) : (
                        <div>
                          <GreyCircle size="h-2.5 w-2.5" />
                        </div>
                      )}
                      <p>{content}</p>
                    </div>
                    <p>{NoOfTasks && NoOfTasks[index]}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">No projects</div>
            )}
          </AccordionContent>
        </Link>
      </AccordionItem>
    </Accordion>
  );
};

export default DropDown;
