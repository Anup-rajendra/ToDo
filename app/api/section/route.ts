import { db } from "@/lib/db";

interface Tasks {
  section_id: number;
  section_name: string;
  total_section_tasks: number;
}

export async function GET(req: Request) {
  try {
    const projectName = req.headers.get("Encoded-value");
    if (projectName) {
      const noOfTasks: Tasks[] = await db.$queryRaw`
        SELECT "Task".section_id,"Section".section_name, COUNT(*)::integer As total_section_tasks
        FROM "Section"
        JOIN "Task" ON "Section".section_id = "Task".section_id
        JOIN "Project" ON "Section".project_id = "Project".project_id
        WHERE "Project".project_name = ${projectName}
        GROUP BY "Section".section_name, "Task".section_id;

       `;

      const sections: Tasks[] = noOfTasks.map((task) => ({
        section_id: task.section_id,
        section_name: task.section_name,
        total_section_tasks: task.total_section_tasks,
      }));
      return Response.json({
        sections,
      });
    }
  } catch (error) {
    console.error("Error fetching section:", error);
    return Response.json({
      error: "Internal Server Error",
    });
  }
}
