// "use client";
// import React, { useEffect, useState } from "react";
// import DropDown from "./Dropdown";
// import UserInfo from "./Userinfo";
// import Link from "next/link";
// import { SquareUserRound } from "lucide-react";

// const SideBar = () => {
//   const [projectNames, setProjectNames] = useState<string[]>([]);
//   const [noOfTasks, setNoOfTasks] = useState<number[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log("running client-side fetch....");

//       try {
//         const response = await fetch("/api/projects", {
//           method: "GET",
//         });
//         const projects = await response.json();
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         setProjectNames(projects.projectNames);
//         setNoOfTasks(projects.noOfTasks);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div className="pb-7">
//         <UserInfo />
//       </div>
//       <Link href="/dashboard/profile">
//         <div className="pl-4 flex items-center">
//           <div>
//             <SquareUserRound />
//           </div>
//           <div className="pl-2">Profile</div>
//         </div>
//       </Link>
//       <div>
//         <DropDown props={projectNames} NoOfTasks={noOfTasks} />
//       </div>
//     </div>
//   );
// };

// export default SideBar;
