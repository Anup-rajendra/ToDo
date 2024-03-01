import React from "react";
import { DeleteIcon } from "./ui/deleteicon";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
interface DeleteDialogBoxProps {
  taskId: string;
}
const DeleteDialogBox: React.FC<DeleteDialogBoxProps> = ({ taskId }) => {
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/tasks/deletemaintask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newTask = await response.json();
      console.log("New task added:", newTask);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <DeleteIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">
            Do you want to delete the Task?
          </DialogTitle>
          <DialogDescription className="pb-2">
            This action cannot be undone. This will permanently delete the task.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end ">
          <DialogClose asChild>
            <Button type="button" variant="destructive" onClick={handleSubmit}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteDialogBox;
