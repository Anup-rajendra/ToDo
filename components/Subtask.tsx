"use client";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import DialogBox from "./Dialogbox";
import AddTask from "./Addtask";
import { Dots } from "./ui/dots";
const SubTasks = () => {
  const [terms1Checked, setTerms1Checked] = useState(false);
  const [terms2Checked, setTerms2Checked] = useState(false);
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover((test) => !test);
  };

  const handleCheckboxChange = (checkboxId: string) => {
    if (checkboxId === "terms1") {
      setTerms1Checked(!terms1Checked);
    } else if (checkboxId === "terms2") {
      setTerms2Checked(!terms2Checked);
    }
  };
  const handleDeletion = () => {
    console.log("deleted");
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-[50%]">
        <AccordionItem value="item-1" showBorder={false}>
          <AccordionTrigger>
            <div className=" flex justify-between border-b pb-1 w-[100%] text-left">
              <div>
                Another Section
                <span className="text-gray-400 font-normal pl-2">4</span>
              </div>
              <div>
                <Dots />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-3">
            <div className="flex flex-col gap-3.5">
              <div
                className="flex items-center justify-between border-b pb-3"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
              >
                <div className="flex items-center">
                  <Checkbox
                    id="terms1"
                    checked={terms1Checked}
                    onClick={() => handleCheckboxChange("terms1")}
                  />
                  <label
                    htmlFor="terms1"
                    className={`text-sm font-medium leading-none ${
                      terms1Checked ? "line-through" : ""
                    } peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2`}
                  >
                    This is a Task
                  </label>
                </div>
                {hover ? <DialogBox onClick={handleDeletion} /> : ""}
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex flex-col ">
                  <div className="flex items-center">
                    <Checkbox
                      id="terms2"
                      checked={terms2Checked}
                      onClick={() => handleCheckboxChange("terms2")}
                    />
                    <label
                      htmlFor="terms2"
                      className={`text-sm font-medium leading-none ${
                        terms2Checked ? "line-through" : ""
                      } peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2`}
                    >
                      This is yet another Task
                    </label>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-400 text-[12px] pl-6">0/2</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3.5 pl-6">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <Checkbox id="terms3" />
                    <label
                      htmlFor="terms3"
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2`}
                    >
                      This is a Sub-Task
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <Checkbox id="terms4" />
                    <label
                      htmlFor="terms4"
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2`}
                    >
                      This is a another Sub-Task
                    </label>
                  </div>
                </div>
              </div>
              <AddTask />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default SubTasks;
