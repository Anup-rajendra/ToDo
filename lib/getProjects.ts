import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export const getProjects = async () => {
  const session = await getServerSession(authOptions);
  const user_id = Number(session?.user.id);
  console.log("User ID:", user_id);

  try {
    const projects = await db.project.findMany({
      where: { user_id: user_id },
      select: { project_name: true },
    });

    // Extract project names from the result
    const projectNames = projects.map((project) => project.project_name);
    console.log("Project Names:", projectNames);

    // Return the project names as props
    return {
      projectNames,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      projectNames: [], // or handle the error in an appropriate way
    };
  }
};
