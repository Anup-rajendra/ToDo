import { db } from "@/lib/db";
export async function POST(req: Request) {
    
  try {
    const jsonBody = await req.json();
    const email = jsonBody  ;
    console.log(email);

    if (!email) {
      return Response.json({ message: "Email not found" });
    }
    const checkemail = await db.user.findUnique({
      where: { email: email.email },
    });
    if(checkemail){
    return Response.json(checkemail,{status:200});
    }
    else{
       return Response.json({ message: "Email not in Database" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error checking email from the database:", error);
    return Response.json({ message: "Internal server error" },{status:500});
  }
}
