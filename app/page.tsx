import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/ui/loginform";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex items-center">
        <LoginForm></LoginForm>
      </div>
    </main>
  );
}
