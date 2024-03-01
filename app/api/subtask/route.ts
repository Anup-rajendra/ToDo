import { db } from "@/lib/db";

export interface SubTaskType {
  subtask_id: string;
  subtask_name: number;
  is_completed: boolean;
}

export async function GET(req: Request) {
  try {
    const data = req.headers.get("Encoded-value");
    const taskIdData = Number(data);
    if (taskIdData) {
      const subTasksDetail: SubTaskType[] = await db.$queryRaw`
          SELECT 
    a.task_id AS subtask_id, 
    a.task_name AS subtask_name, 
    a.is_completed AS is_completed
FROM 
    "Task" a
JOIN 
    "Task" b ON a.parent_task_id = b.task_id
WHERE 
    a.is_main_task = false
    AND b.task_id = ${taskIdData} 
    ORDER BY subtask_id
       `;
      console.log(
        "Main Task",
        taskIdData,
        "subTasksDetail",
        subTasksDetail,
        typeof subTasksDetail
      );
      return Response.json({
        subTasksDetail: subTasksDetail,
      });
    }
  } catch (error) {
    console.error("Error fetching section:", error);
    return Response.json({
      error: "Internal Server Error",
    });
  }
}
