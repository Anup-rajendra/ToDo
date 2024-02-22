import React from "react";
import { RedCross } from "./ui/redcross";
const AddTask = () => {
  return (
    <div className="flex items-center gap-2">
      <RedCross />
      <p className="text-gray-400 font-medium">Add Task</p>
    </div>
  );
};
export default AddTask;
