import React, { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { SubTaskType } from "@/app/api/subtask/route";
import DialogBox from "./Deletedialogbox";
import AddSubTask from "./AddSubTask";

interface SubTasksProps {
  sectionId: number;
  mainTaskId: string;
}

const SubTasks: React.FC<SubTasksProps> = ({ sectionId, mainTaskId }) => {
  const mainId = Number(mainTaskId);
  const [noOfSubTasks, setNoOfSubTasks] = useState<SubTaskType[]>([]);
  const [hoveredSubtaskId, setHoveredSubtaskId] = useState<string | null>(null);

  const handleCheckboxChange = (subtaskId: string) => {
    console.log("Handling checkbox");
    setNoOfSubTasks((prevTasks) =>
      prevTasks.map((subtask) =>
        subtask.subtask_id === subtaskId
          ? { ...subtask, is_completed: !subtask.is_completed }
          : subtask
      )
    );
    const updatedTask = noOfSubTasks.find(
      (task) => task.subtask_id === subtaskId
    );
    if (updatedTask) {
      updateIsCompletedInBackend(subtaskId, !updatedTask.is_completed);
    }
    console.log(updatedTask);
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
            "Main-task":mainTaskId,
          },
          body: JSON.stringify({
            is_completed: isCompleted,
          }),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error updating is_completed:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mainTaskId) {
          const encodedValue = encodeURIComponent(mainTaskId);
          const response = await fetch("/api/subtask", {
            headers: {
              "Content-Type": "application/json",
              "Encoded-Value": encodedValue,
            },
            method: "GET",
          });
          const taskSub = await response.json();
          if (taskSub) {
            setNoOfSubTasks(taskSub.subTasksDetail);
          }

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
      } catch (error) {
        console.error("Error fetching taskSub:", error);
      }
    };

    fetchData();
  }, [mainTaskId]);

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
                onMouseEnter={() => handleMouseEnter(subtask.subtask_id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <Checkbox
                      id={subtask.subtask_id}
                      onClick={() => handleCheckboxChange(subtask.subtask_id)}
                      checked={subtask.is_completed}
                    />
                    <label
                      htmlFor="terms3"
                      className={`text-sm font-medium leading-none ${
                        subtask.is_completed ? "line-through" : ""
                      } peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2`}
                    >
                      {subtask.subtask_name}
                    </label>
                  </div>
                  {hoveredSubtaskId === subtask.subtask_id && (
                    <DialogBox taskId={subtask.subtask_id} />
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
