import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addSubTaskDetails } from "../app/store/slice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@radix-ui/react-dialog";
import { RedCrossTwo } from "./ui/redcrosstwo";
import { v4 as uuidv4 } from "uuid";
import { setSelectSection, setMainTasks,setSelectSubTaskMainId, setSubTasks } from "@/app/store/slice";
import { useAppDispatch } from "@/app/store/store";
import { SectionData, SubtaskData } from "@/app/store/types";

interface AddMaintaskProps {
  maintaskId: string;
  sectionId:string;
}
const FormSchema = z.object({
  subtaskname: z.string().min(1, { message: "Task name is required" }).max(500),
});
const AddSubTask: React.FC<AddMaintaskProps> = ({ maintaskId, sectionId }) => {
  const dispatch=useAppDispatch();
  useEffect(()=>{

  },[])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subtaskname: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const subTaskId:string=uuidv4();
       const subTaskDetail:SubtaskData={
        id:subTaskId,
        name:data.subtaskname,
        completed:false,
      }
      dispatch(setSubTasks(subTaskDetail));
      const encodedValue = encodeURIComponent(maintaskId);
      console.log(data);
      const encodedSectionValue = encodeURIComponent(sectionId);
      const response = await fetch("/api/tasks/addsubtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "maintask-id": encodedValue,
          "section-id": encodedSectionValue,
          "subtask-id":subTaskId,
        },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newTask = await response.json();
      console.log("New subtask added:", newTask);
    } catch (error) {
      console.error("Error adding subtask:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          <RedCrossTwo />
          <p className="text-gray-400 font-medium">Add Sub Task</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter the Sub Task</DialogTitle>
          <DialogDescription>
            Add changes to the Sub Task here. Click save when you&aposre done.
          </DialogDescription>
        </DialogHeader>
        <p className="font-bold">Task Name:</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 "
          >
            <FormField
              control={form.control}
              name="subtaskname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="subtaskname"
                      placeholder="Enter Task"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit">Save</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddSubTask;
function setSubtasks(subTaskDetail: SubtaskData): any {
  throw new Error("Function not implemented.");
}

