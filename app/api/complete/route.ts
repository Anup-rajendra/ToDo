import { db } from "@/lib/db";
export async function PATCH(request: Request) {
  try {
    const data = request.headers.get("Encoded-value");
    if (data) {
      const taskId = decodeURIComponent(data);
      const body = await request.json();
      const { is_completed } = body;
      console.log(is_completed, taskId);
      const updatedTask = await db.task.update({
        where: { task_id: taskId },
        data: {
          is_completed: is_completed,
        },
      });
      const updatedSubTask = await db.task.updateMany({
        where: { parent_task_id: taskId },
        data: {
          is_completed: is_completed,
        },
      });

      console.log(updatedSubTask);
      return Response.json(updatedTask);
    }
  } catch (error) {
    console.error("Error updating resource:", error);
    return Response.json({ message: "Internal server error" });
  }
}
