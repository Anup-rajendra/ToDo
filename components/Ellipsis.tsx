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
import AddTask from "./Addtask";

const handleDeletion = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  event.stopPropagation();
  console.log("Deleted");
};
interface EllipsisProp {
  sectionId: string;
}
export const Ellipsis: React.FC<EllipsisProp> = ({ sectionId }) => {
  return (
    <div className="relative z-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image src="/dots.png" alt="multiple" width={20} height={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Task Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div onClick={(e) => handleDeletion(e)}>
              <AddTask sectionId={sectionId} display={false} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
