import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const UserInfo = () => {
  return (
    <div className="flex items-center w-full">
      <div className="mr-4">
        <Avatar>
          <AvatarImage src="/user-profile-icon.jpg" alt="User"  />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="font-medium text-2xl">Username</div>
    </div>
  );
};
export default UserInfo;
