import { db } from "@/lib/db";
interface SubTaskCount{
  count:number;
}
export async function PATCH(request: Request) {
  try {
    const data = request.headers.get("Encoded-value");
    const mainTaskId = Number(request.headers.get("Main-Task"));
  
    if (data) {
      const taskId = Number(decodeURIComponent(data));
      const body = await request.json();
      const { completed } = body;
      console.log( completed, taskId);
      const updatedTask = await db.task.update({
        where: { task_id: taskId },
        data: {
          is_completed:  completed,
        },
      });
       const countSubTask: SubTaskCount[] =await db.$queryRaw`Select Count(*)::integer AS count from "Task" Where parent_task_id=${mainTaskId}`;
      const countCompletedSubTask:SubTaskCount[]=await db.$queryRaw`Select Count(*)::integer AS count from "Task" Where parent_task_id=${mainTaskId} and is_completed=true`;
      const complete: number = countCompletedSubTask[0].count;
      const total: number = countSubTask[0].count;
      if(complete==total){
        const updateMain=await db.task.update({
          where:{task_id:mainTaskId},
          data:{
            is_completed:true,
          }
        })
      }else{
         const updateMain = await db.task.update({
           where: { task_id: mainTaskId },
           data: {
             is_completed: false,
           },
         });
      }
       
      return Response.json(updatedTask);
    }
  } catch (error) {
    console.error("Error updating resource:", error);
    return Response.json({ message: "Internal server error" });
  }
}
