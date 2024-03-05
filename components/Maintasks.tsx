import React, { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { TasksData } from "@/app/api/maintask/route";
import SubTasks from "./Subtasks";
import { GitMerge } from "lucide-react";
import DialogBox from "./Deletedialogbox";
import {
  selectError,
  selectLoading,
  selectTodo,
  selectSelectProject,
  setSelectProject,
} from "@/app/store/slice";
import { store, useAppDispatch, useTypedSelector } from "@/app/store/store";
import { useMainTaskDetails, useProjectName, useSectionName } from "./util";
 

interface MainTasksProp {
  sectionName: string;
  sectionId: number;
}

const MainTasks: React.FC<MainTasksProp> = ({ sectionId, sectionName }) => {
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const mainTaskDetails = useMainTaskDetails(sectionName);
  const [mainTasks,setMainTasks]=useState<TasksData[]>(mainTaskDetails)

  
  const handleCheckboxChange = (taskId: string) => {
      setMainTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.task_id === Number(taskId)
            ? { ...task, is_completed: !task.is_completed }
            : task
        )
     
    );
    
        const updatedTask = mainTasks.find(
          (task) => task.task_id === Number(taskId)
        );

        if (updatedTask) {
          updateIsCompletedInBackend(taskId, !updatedTask.is_completed);
        }
      
  };

  const updateIsCompletedInBackend = async (
    taskId: string,
    isCompleted: boolean
  ) => {
    try {
      const encodedValue = encodeURIComponent(taskId);
      if (encodedValue) {
        const response = await fetch(`/api/complete`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Encoded-Value": encodedValue,
          },
          body: JSON.stringify({
            is_completed: isCompleted,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error updating is_completed:", error);
    }
  };


  return (
    <div>
      {Array.isArray(mainTasks) &&
        mainTasks.map((task, index) => (
          <div
            key={index}
            className="flex flex-col gap-3.5 pt-3"
            onMouseEnter={() => setHoveredTaskId(String(task.task_id))}
            onMouseLeave={() => setHoveredTaskId(null)}
          >
            <div className="flex items-center flex-row border-b pb-3">
              <div className="w-full flex justify-between">
                <div className="flex">
                  <Checkbox
                    id={String(task.task_id)}
                    onClick={() => handleCheckboxChange(String(task.task_id))}
                    checked={task.is_completed}
                  />
                  <div className="flex justify-center flex-col">
                    <label
                      htmlFor={String(task.task_id)}
                      className={`text-sm font-medium leading-none ${
                        task.is_completed ? "line-through" : ""
                      } peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2`}
                    >
                      {task.task_name}
                    </label>

                    {task.subtask_count > 0 ? (
                      <div>
                        <div className="flex pl-3 text-xs pt-1 -mb-3">
                          <GitMerge className="w-4 h-4" />
                          <div className="pl-1">
                            {task.completed_subtask_count}/{task.subtask_count}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {hoveredTaskId === String(task.task_id) && (
                  <DialogBox taskId={String(task.task_id)} />
                )}
              </div>
            </div>
            <SubTasks mainTaskId={String(task.task_id)} sectionId={sectionId} />
          </div>
        ))}
    </div>
  );
};

export default MainTasks;
