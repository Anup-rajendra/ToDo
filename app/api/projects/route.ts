import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
interface Project {
  project_id: number;
  project_name: string;
  totalTasks: number;
}
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const user_id = Number(session?.user.id);
  console.log("USER_ID", user_id);

  try {
    // Fetch project names
    const projects = await db.project.findMany({
      where: { user_id: user_id },
      select: { project_name: true },
    });

    // Extract project names from the result
    const projectNames = projects.map((project) => project.project_name);
    console.log("Project Names:", projectNames);

    // Fetch project tasks counts
    const projectsWithTaskCounts: Project[] = await db.$queryRaw`SELECT
      project_id,
      project_name,
      (
        SELECT COUNT(*)
        FROM tasks
        WHERE section_id IN (SELECT section_id FROM sections WHERE project_id = p.project_id)
      ) AS totalTasks
      FROM projects p
      WHERE user_id = ${user_id}`;

    console.log(projectsWithTaskCounts);

    // Extract the total task counts for each project
    const NoOfTasks = projectsWithTaskCounts.map(
      (project) => project.totalTasks
    );

    // Return the project names and task counts as props
    return {
      props: {
        projectNames,
        NoOfTasks,
      },
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      props: {
        projectNames: [],
        NoOfTasks: [], // or handle the error in an appropriate way
      },
    };
  }
}
