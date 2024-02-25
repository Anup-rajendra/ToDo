"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center w-full">
      <div className="mr-4">
        <Avatar>
          <AvatarImage src="/user-profile-icon.jpg" alt="User" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="font-medium text-2xl">{session?.user.username}</div>
    </div>
  );
};

export default UserInfo;
