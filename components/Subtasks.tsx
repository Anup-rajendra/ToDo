import React, { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { SubTaskType } from "@/app/api/subtask/route";
import DialogBox from "./Deletedialogbox";
import AddSubTask from "./AddSubTask";
import { useSubTaskDetails } from "./util";
import { SubtaskData } from "@/app/store/types";

interface SubTasksProps {
  sectionId: number;
  mainTaskId: string;
}

const SubTasks: React.FC<SubTasksProps> = ({ sectionId, mainTaskId }) => {
  const mainId = Number(mainTaskId);
  const subTaskDetails:SubtaskData[]=useSubTaskDetails(sectionId,mainTaskId)
  const [noOfSubTasks, setNoOfSubTasks] = useState<SubtaskData[]>(subTaskDetails);
  const [hoveredSubtaskId, setHoveredSubtaskId] = useState<string | null>(null);
  const handleCheckboxChange = (subtaskId: string) => {
    console.log("Handling checkbox");
    console.log(noOfSubTasks);
    setNoOfSubTasks((prevTasks) =>
      prevTasks.map((subtask) =>
        subtask.id=== Number(subtaskId)
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    );
    const updatedTask = noOfSubTasks.find(
      (task) => task.id=== Number(subtaskId)
    );
    console.log(updatedTask);
    if (updatedTask) {
      updateIsCompletedInBackend(subtaskId, !updatedTask.completed);
    }
    
  };

  const updateIsCompletedInBackend = async (
    subtaskId: string,
    isCompleted: boolean
  ) => {
    try {
      const encodedValue = encodeURIComponent(subtaskId);
      if (encodedValue) {
        const response = await fetch(`/api/subTaskComplete`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Encoded-Value": encodedValue,
            "Main-Task":mainTaskId,
          },
          body: JSON.stringify({
            completed: isCompleted,
          }),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error updating completed:", error);
    }
  };

  const handleMouseEnter = (subtaskId: string) => {
    setHoveredSubtaskId(subtaskId);
  };

  const handleMouseLeave = () => {
    setHoveredSubtaskId(null);
  };

  return (
    <>
      {noOfSubTasks && noOfSubTasks.length > 0 && (
        <>
          {noOfSubTasks.map((subtask, index) => (
            <div key={index}>
              <div
                className="flex flex-col gap-3.5 pl-6"
                onMouseEnter={() => handleMouseEnter(String(subtask.id))}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <Checkbox
                      id={String(subtask.id)}
                      onClick={() => handleCheckboxChange(String(subtask.id))}
                      checked={subtask.completed}
                    />
                    <label
                      htmlFor="terms3"
                      className={`text-sm font-medium leading-none ${
                        subtask.completed ? "line-through" : ""
                      } peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2`}
                    >
                      {subtask.name}
                    </label>
                  </div>
                  {hoveredSubtaskId === String(subtask.id) && (
                    <DialogBox taskId={String(subtask.id)} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="pl-6 -mt-2">
            <AddSubTask maintaskId={mainId} sectionId={sectionId} />
          </div>
        </>
      )}
    </>
  );
};

export default SubTasks;
