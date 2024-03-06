import React, { useEffect } from "react";
import { RedCross } from "./ui/redcross";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { v4 as uuidv4 } from "uuid";
import { setSelectSection, setMainTasks } from "@/app/store/slice";
import { useAppDispatch } from "@/app/store/store";
import MainTasks from "./Maintasks";
import { AddTaskDetails, MainTaskData } from "@/app/store/types";

interface AddtaskProps {
  sectionId: string;
  display: boolean;
}

const FormSchema = z.object({
  taskname: z.string().min(1, { message: "Task name is required" }).max(500),
  subtaskname: z
    .string()
    .min(1, { message: "Sub Task name is required" })
    .max(500)
    .optional(),
});

const AddTask: React.FC<AddtaskProps> = ({ sectionId, display }) => {
  const dispatch = useAppDispatch();
  useEffect(()=>{
 
  },[])
    
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {  
    const taskid:string=uuidv4();
    const subtaskid:string=uuidv4();
    if(data.subtaskname){
    const mainDetails:AddTaskDetails={
      mainTaskId:taskid,
      mainName:data.taskname,
      mainCompleted:false,
      subTaskId:subtaskid,
      subtaskName:data.subtaskname,
      subCompleted:false,
      
    }
  
    dispatch(setMainTasks(mainDetails));
  }
    else{
       const mainDetails: AddTaskDetails = {
         mainTaskId: taskid,
         mainName: data.taskname,
         mainCompleted: false,
         subTaskId: subtaskid,
         subtaskName: "",
         subCompleted:false,
       };
    
       dispatch(setMainTasks(mainDetails));
    }
    
    try {
      const encodedValue = encodeURIComponent(sectionId);
      const response = await fetch("/api/tasks/addmaintask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Encoded-Value": encodedValue,
          "Main-Task":taskid,
          "Sub-Task":subtaskid
        },
        body: JSON.stringify({ data }),
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
        {display ? (
          <div className="flex items-center gap-2">
            <RedCross />
            <p className="text-gray-400 font-normal">Add MainTask</p>
          </div>
        ) : (
          <div>Add Main Task</div>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Main Task</DialogTitle>
          <DialogDescription>
            Add changes to the section here. Click save when you&apos;sre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 "
          >
            <FormItem>
              <FormLabel htmlFor="taskname">
                <span className="text-red-500">*</span>Task Name:
              </FormLabel>
              <FormField
                control={form.control}
                name="taskname"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      id="taskname"
                      placeholder="Enter Task"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      required={true}
                    />
                  </FormControl>
                )}
              />
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="subtaskname">Sub Task Name:</FormLabel>
              <FormField
                control={form.control}
                name="subtaskname"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      id="subtaskname"
                      placeholder="Enter Initial SubTask(Optional)"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                )}
              />
            </FormItem>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
