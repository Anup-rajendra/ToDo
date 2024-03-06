import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
export async function POST(req: Request) {
  try {
    const jsonBody = await req.json();
    const task_name = jsonBody.data.subtaskname;
    const sectionId = req.headers.get("section-id");
    const mainTaskId = req.headers.get("maintask-id");
    const subTaskId = req.headers.get("subtask-id");
    if (sectionId && mainTaskId && subTaskId) {
      const section_id =  decodeURIComponent(sectionId);
      const maintask_id =  decodeURIComponent(mainTaskId);

      if (!task_name) {
        return Response.json({ message: "Task name is required" });
      }

      const newTask = await db.task.create({
        data: {
          task_id:subTaskId,
          section_id: section_id,
          parent_task_id: maintask_id,
          task_name: task_name,
          is_main_task: false,
          is_completed: false,
        },
      });

      return Response.json(newTask);
    }
  } catch (error) {
    console.error("Error adding task to the database:", error);
    return Response.json({ message: "Internal server error" });
  }
}
