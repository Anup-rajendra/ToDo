import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export default function Page() {
  return (
    <div className="flex pl-9 pt-8 flex-col pr-9 pb-9">
      <Card className="w-[400px]  border-2 border-primary flex ">
        <CardHeader>
          <div className="text-4xl">User Profile</div>
          <div className="flex flex-col pt-7 gap-6">
            <div>
              <Avatar>
                <AvatarImage src="/user-profile-icon.jpg" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="font-semibold pl-4">First Name- New</div>
            <div className="font-semibold pl-4">Last Name- User</div>
            <div className="font-semibold pl-4">Email - newuser@gmail.com</div>
          </div>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex flex-col gap-4"></CardFooter>
      </Card>
    </div>
  );
}
