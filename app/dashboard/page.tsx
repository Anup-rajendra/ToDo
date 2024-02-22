import AddTask from "@/components/Addtask";
import TaskSection from "@/components/Tasksection";
import SubTasks from "@/components/Subtask";
export default function Page() {
  return (
    <div>
      <div className="flex flex-col min-h-screen  pl-9 pt-9 gap-6  ">
        <p className="font-bold text-2xl pl-7 ">Very real Project</p>
        <div className="pl-7">
          <AddTask />
        </div>
        <TaskSection />
        <SubTasks />
      </div>
    </div>
  );
}
