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

interface DropDownprojectName {
  projectName: string[];
  NoOfTasks: number[];
  setSelectedProject: React.Dispatch<React.SetStateAction<string | null>>;
}

const DropDown: React.FC<DropDownprojectName> = ({
  projectName,
  NoOfTasks,
  setSelectedProject,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [noProject, setNoProject] = useState(false);

  useEffect(() => {
    if (projectName) {
      setNoProject(true);
    }
    setSelectedProject(projectName[0]);
  }, [projectName, setSelectedProject]);

  const handleOnClick = useCallback(
    (index: number) => {
      setSelectedIdx(index);
      setSelectedProject(projectName[index]);
    },
    [projectName, setSelectedProject]
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" showBorder={false}>
        <Link href="/dashboard">
          <AccordionTrigger>Project</AccordionTrigger>
        </Link>
        <AccordionContent>
          {noProject ? (
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
      </AccordionItem>
    </Accordion>
  );
};

export default DropDown;
