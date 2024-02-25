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
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
interface DialogBoxProps {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}
const DialogBox: React.FC<DialogBoxProps> = ({ onClick }) => {
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
          <Button type="button" variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DialogBox;
