"use client";
import React from "react";
import DropDown from "./Dropdown";
import UserInfo from "./Userinfo";
import Link from "next/link";
import { SquareUserRound } from "lucide-react";
const SideBar = () => {
  return (
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
      <div>
        <DropDown
          props={[
            "Zapier",
            "Very real Project",
            "This project",
            "Also this project",
          ]}
          NoOfTasks={[8, 9]}
        />
      </div>
    </div>
  );
};
export default SideBar;
