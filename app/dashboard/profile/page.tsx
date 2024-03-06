"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTotalTaskName, useUserDetails } from "@/components/util";
const Page = () => {
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const totalTasks = useTotalTaskName();
  const userDetails = useUserDetails();
  return (
    <div className="flex w-full">
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
              {userDetails && (
                <>
                  <div className="font-semibold pl-4">
                    Username-
                    <span className="font-medium">{userDetails.username}</span>
                  </div>
                  <div className="font-semibold pl-4">
                    First Name-
                    <span className="font-medium">{userDetails.firstname}</span>
                  </div>
                  <div className="font-semibold pl-4">
                    Last Name-
                    <span className="font-medium">{userDetails.lastname}</span>
                  </div>
                  <div className="font-semibold pl-4">
                    Email -
                    <span className="font-medium"> {userDetails.email}</span>
                  </div>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex flex-col gap-4"></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
