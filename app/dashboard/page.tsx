"use client";
import BodyContent from "@/components/Bodycontent";
import React, { useEffect, useState, useContext } from "react";
import DropDown from "@/components/Dropdown";
import UserInfo from "@/components/Userinfo";
import Link from "next/link";
import { SquareUserRound } from "lucide-react";
import { store } from "../store/store";
import { Provider } from "react-redux";
const Page = () => {
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const [noOfTasks, setNoOfTasks] = useState<number[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/projects", {
          method: "GET",
        });
        const projects = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setProjectNames(projects.projectNames);
        setNoOfTasks(projects.noOfTasks);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
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
                projectName={projectNames}
                NoOfTasks={noOfTasks}
                setSelectedProject={setSelectedProject}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <BodyContent selectedProject={selectedProject} />
        </div>
      </div>
    </Provider>
  );
};

export default Page;
