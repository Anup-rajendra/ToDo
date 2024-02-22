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
          <DialogTitle>
            <div className="pb-2">Do you want to delete the Task?</div>
          </DialogTitle>
          <DialogDescription>
            <div className="pb-2">
              This action cannot be undone. This will permanently delete the
              task.
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end ">
          <Button type="button" variant="destructive">
            Delete
          </Button>
          <DialogClose>
            <Button type="button" variant="default">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DialogBox;
