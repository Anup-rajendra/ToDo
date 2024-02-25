import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(authOptions);
    const projectId = req.query.projectId as string;

    try {
      // Fetch sections and their tasks based on the project ID
      const sections = await db.section.findMany({
        where: {
          project_id: Number(projectId),
        },
      });

      // Calculate task count for each section
      const sectionsWithTaskCount = await db.$queryRaw`
      SELECT
        s.section_id,
        s.section_name,
        COUNT(t.task_id) as taskCount
      FROM
        Section s
      LEFT JOIN
        Task t ON s.section_id = t.section_id
      WHERE
        s.project_id = ${projectId}
      GROUP BY
        s.section_id, s.section_name
      ORDER BY
        s.section_id ASC
    `;
      const mainTasksCountInSection = await db.$queryRaw`
      SELECT
        s.section_id,
        s.section_name,
        COUNT(t.task_id) as mainTasksCount
      FROM
        Section s
      LEFT JOIN
        Task t ON s.section_id = t.section_id
      WHERE
        s.project_id = ${projectId}
        AND t.is_main_task = true
      GROUP BY
        s.section_id, s.section_name
      ORDER BY
        s.section_id ASC
    `;
      try {
        const sectionWithMainTaskNames = await db.$queryRaw`
      SELECT
        s.section_id,
        s.section_name,
        ARRAY_AGG(t.task_name) as mainTaskNames
      FROM
        Section s
      LEFT JOIN
        Task t ON s.section_id = t.section_id
      WHERE
        s.project_id = ${projectId}
        AND t.is_main_task = true
      GROUP BY
        s.section_id, s.section_name
      ORDER BY
        s.section_id ASC
    `;

        return sectionWithMainTaskNames;
      } catch (error) {
        console.error("Error fetching section with main task names:", error);
        throw error;
      }
      res.status(200).json({ sections: sectionsWithTaskCount });
    } catch (error) {
      console.error("Error fetching sections:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
