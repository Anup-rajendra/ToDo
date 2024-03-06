import { db } from "@/lib/db";

export interface TasksData {
  task_id: string;
  task_name: string;
  is_completed: boolean;
  subtask_count: number;
  completed_subtask_count: number;
}

export async function GET(req: Request) {
  try {
    const sectionName = req.headers.get("Encoded-value");
    if (sectionName) {
      const mainTaskDetails: TasksData[] = await db.$queryRaw`
          SELECT 
    t.task_id AS task_id,
    t.task_name AS task_name,
    t.is_completed AS is_completed,
    (
        SELECT COUNT(*)::integer
        FROM "Task" sub
        WHERE sub.parent_task_id = t.task_id
    ) AS subtask_count,
    (
        SELECT COUNT(*)::integer
        FROM "Task" sub
        WHERE sub.parent_task_id = t.task_id
        AND sub.is_completed = true
    ) AS completed_subtask_count
FROM 
    "Task" t
JOIN 
    "Section" s ON t.section_id = s.section_id
WHERE 
    t.is_main_task = true
    AND s.section_name = ${sectionName}
    ORDER BY task_id;
       `;
      console.log("mainTaskDetails", mainTaskDetails, typeof mainTaskDetails);
      return Response.json({
        mainTaskDetails: mainTaskDetails,
      });
    }
  } catch (error) {
    console.error("Error fetching section:", error);
    return Response.json({
      error: "Internal Server Error",
    });
  }
}
