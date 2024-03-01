"use client";
import BodyContent from "@/components/Bodycontent";
import React, { useEffect, useState } from "react";
import DropDown from "@/components/Dropdown";
import UserInfo from "@/components/Userinfo";
import Link from "next/link";
import { SquareUserRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { UserProfileTypes } from "@/app/api/user/profile/route";

const Page = () => {
  const { data: session } = useSession();
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const [noOfTasks, setNoOfTasks] = useState<number[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
        });
        const userInfo = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setUserData(userInfo[0]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, [userData]);

  return (
    <div className="flex flex-row">
      <div className="flex w-1/4 flex-col gap-2 bg-primary-foreground min-h-screen">
        <div>
          <div className="pb-7">
            <UserInfo />
          </div>
          <Link href="/dashboard/profile">
            <div className="pl-4 flex items-center">
              <div>
                <SquareUserRound />
              </div>
              <div className="pl-2">Profile</div>
            </div>
          </Link>
          <div className="mt-8">
            <DropDown
              props={projectNames}
              NoOfTasks={noOfTasks}
              setSelectedProject={setSelectedProject}
            />
          </div>
        </div>
      </div>
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
                {userData && (
                  <>
                    <div className="font-semibold pl-4">
                      Username-
                      <span className="font-medium"> {userData.username}</span>
                    </div>
                    <div className="font-semibold pl-4">
                      First Name-
                      <span className="font-medium"> {userData.firstname}</span>
                    </div>
                    <div className="font-semibold pl-4">
                      Last Name-
                      <span className="font-medium"> {userData.lastname}</span>
                    </div>
                    <div className="font-semibold pl-4">
                      Email -
                      <span className="font-medium"> {userData?.email}</span>
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
    </div>
  );
};

export default Page;
