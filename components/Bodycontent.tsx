"use client";
import React, { useEffect, useState } from "react";
import AddTask from "./Addtask";
import SubTasks, { SectionProps } from "./Section";
import { number } from "zod";
import Section from "./Section";

interface BodyContentProps {
  selectedProject: string | null;
}

const BodyContent: React.FC<BodyContentProps> = ({ selectedProject }) => {
  const [section, setsections] = useState<SectionProps["sections"]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedProject) {
          const encodedValue = encodeURIComponent(selectedProject);
          const response = await fetch("/api/section", {
            headers: {
              "Content-Type": "application/json",
              "Encoded-Value": encodedValue,
            },
            method: "GET",
          });
          const sections = await response.json();
          if (sections) {
            setsections(sections.sections);
          }
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
      } catch (error) {
        console.error("Error fetching Sections:", error);
      }
    };

    fetchData();
  }, [selectedProject]);
  return (
    <div className="w-[100%]">
      <div className="flex flex-col min-h-screen pl-9 pt-9 gap-6">
        <p className="font-bold text-2xl pl-7">{selectedProject}</p>
        <Section sections={section} />
      </div>
    </div>
  );
};

export default BodyContent;
