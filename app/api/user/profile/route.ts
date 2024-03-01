import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export interface UserProfileTypes {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const user_id = Number(session?.user.id);
  try {
    const UserDetails: UserProfileTypes = await db.$queryRaw`SELECT
        username,
        firstname,
        lastname,
        email 
        FROM "User" 
        WHERE id = ${user_id}`;

    return Response.json(UserDetails);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json({
      error: "Internal Server Error",
      user_id,
    });
  }
}
