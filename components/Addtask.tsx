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
  DialogClose,
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AddtaskProps {
  sectionId: number;
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const encodedValue = encodeURIComponent(sectionId);
      const response = await fetch("/api/tasks/addmaintask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Encoded-Value": encodedValue,
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
                      {...field}
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
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </FormItem>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <DialogClose>
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
