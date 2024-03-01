import { db } from "@/lib/db";
export async function POST(req: Request) {
  try {
    const jsonBody = await req.json();
    const task_id = jsonBody.taskId;
    console.log(task_id);
    if (task_id) {
      const deletedTask = await db.task.delete({
        where: { task_id: task_id },
      });

      return Response.json(deletedTask);
    } else {
      return Response.json({ message: "Task Id not found" });
    }
  } catch (error) {
    console.error("Error adding task to the database:", error);
    return Response.json({ message: "Internal server error" });
  }
}
