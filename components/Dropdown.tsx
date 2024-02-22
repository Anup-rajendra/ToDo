"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { YellowCircle, GreyCircle } from "./ui/circles";
import Link from "next/link";

interface DropDownProps {
  props: string[];
  NoOfTasks: number[];
}

const DropDown: React.FC<DropDownProps> = ({ props, NoOfTasks }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleOnClick = (index: number) => {
    setSelectedIdx(selectedIdx === index ? null : index);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" showBorder={false}>
        <Link href="/dashboard">
          <AccordionTrigger>Project</AccordionTrigger>
        </Link>
        <AccordionContent>
          {Array.isArray(props) &&
            props.map((content, index) => (
              <div key={index} onClick={() => handleOnClick(index)}>
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
                  <p>{NoOfTasks[0]}</p>
                </div>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DropDown;
