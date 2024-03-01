"use client";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import AddTask from "./Addtask";
import { Ellipsis } from "./Ellipsis";
import MainTasks from "./Maintasks";
export interface SectionProps {
  sections: {
    section_id: number;
    section_name: string;
    total_section_tasks: number;
  }[];
}
const Section: React.FC<SectionProps> = ({ sections }) => {
  useEffect(() => {}, [sections]);
  return (
    <div className="flex flex-col">
      {sections.map((section, index) => (
        <div key={index} className="flex flex-row mb-10">
          <Accordion type="single" collapsible className="w-[50%]">
            <AccordionItem value="item-1" showBorder={false}>
              <AccordionTrigger>
                <div className="flex justify-between border-b pb-1 w-[100%] text-left">
                  <div>
                    {section.section_name}
                    <span className="text-gray-400 font-normal pl-2">
                      {section.total_section_tasks}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-3">
                <div className="pt-2">
                  <AddTask sectionId={section.section_id} display={true} />
                </div>
                <MainTasks
                  sectionName={section.section_name}
                  sectionId={section.section_id}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="pb-5 -ml-6">
            <Ellipsis sectionId={section.section_id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Section;