"use client";
import React, { useEffect, useState } from "react";
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
interface TaskSectionProps {
  tasksId?: number;
  projectId: number; // Add project ID as a prop
}

const TaskSection: React.FC<TaskSectionProps> = ({ projectId }) => {
  const [sections, setSections] = useState([]); // State to store sections
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover((prevHover) => !prevHover);
  };
  const handleCheckboxChange = (taskId: number) => {
    // Implement the logic to update the completed status of the task in the database
    console.log(`Checkbox clicked for task ${taskId}`);
  };
  const handleDeletion = () => {
    console.log("deleted");
  };

  useEffect(() => {
    // Fetch sections based on the project ID
    const fetchSections = async () => {
      try {
        const response = await fetch(`/api/sections?projectId=${projectId}`);
        const data = await response.json();
        setSections(data.sections);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, [projectId]);

  return (
    <div className="flex">
      {sections.map((section) => (
        <Accordion
          key={section.id}
          type="single"
          collapsible
          className="w-[50%]"
        >
          <AccordionItem value={`item-${section.id}`} showBorder={false}>
            <AccordionTrigger>
              <div className="flex border-b pb-1 w-[100%] text-left justify-between">
                <div>
                  {section.name}
                  <span className="text-gray-400 font-normal pl-2">
                    {section.taskCount}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-3">
              <div className="flex flex-col gap-3.5">
                {section.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between border-b pb-3"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onClick={() => handleCheckboxChange(task.id)}
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`text-sm font-medium leading-none ${
                          task.completed ? "line-through" : ""
                        } peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2`}
                      >
                        {task.name}
                      </label>
                    </div>
                    {hover ? <DialogBox onClick={handleDeletion} /> : ""}
                  </div>
                ))}
                <AddTask />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <div className="block pt-5">
        <Dots />
      </div>
    </div>
  );
};

export default TaskSection;
