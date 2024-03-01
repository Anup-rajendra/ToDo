import { db } from "@/lib/db";
export async function POST(req: Request) {
    
  try {
    const jsonBody = await req.json();
    const email = jsonBody.data.email;
    console.log(email);

    if (!email) {
      return Response.json({ message: "Email not found" });
    }
    const checkemail = await db.user.findUnique({
      where: { email: email },
    });

    return Response.json(checkemail);
  } catch (error) {
    console.error("Error checking email from the database:", error);
    return Response.json({ message: "Internal server error" });
  }
}
