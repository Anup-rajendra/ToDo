import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface Project {
  project_id: string;
  project_name: string;
  total_tasks: number;
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const user_id = Number(session?.user.id);

  try {
    // Fetch project tasks counts

    const projectsWithTaskCounts: Project[] = await db.$queryRaw`SELECT
        project_id,
        project_name,
        (
          SELECT COUNT(*)::integer
          FROM "Task"
          WHERE section_id IN (SELECT section_id FROM "Section" WHERE project_id = p.project_id)
        ) AS "total_tasks"
        FROM "Project" p
        WHERE user_id = ${user_id}`;

    const projectNamesArray = projectsWithTaskCounts.map(
      (project) => project.project_name
    );

    const projectTasksArray = projectsWithTaskCounts.map(
      (project) => project.total_tasks
    );

    return Response.json({
      projectNames: projectNamesArray,
      noOfTasks: projectTasksArray,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json({
      error: "Internal Server Error",
      user_id,
    });
  }
}
