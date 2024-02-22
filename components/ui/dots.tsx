import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const handleDeletion = () => {
  console.log("Deleted");
};
export const Dots = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image src="/dots.png" alt="multiple option" width={20} height={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Task Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Add Task</DropdownMenuItem>
        <DropdownMenuItem>
          <div onClick={handleDeletion}>Delete Section</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
