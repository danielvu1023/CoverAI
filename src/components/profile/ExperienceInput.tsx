import React, { useState } from "react";
import ExperienceItem from "./ExperienceItem";
import type { ExperienceInfo } from "../../types";

export default function ExperienceInput() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [experience, setExperience] = useState<ExperienceInfo[]>([
    {
      company: "Above Technology Inc",
      jobTitle: "Intern",
      startDate: "2016-09-01",
      endDate: "2017-07-01",
      location: "Taipei, Taiwan",
      description:
        "Building web data parsers using Java and the Jsoup library while leveraging Linux and Docker for efficient service deployment.",
    },
    {
      company: "Full Stack Engineer",
      jobTitle: "Mapleau Technology Inc",
      startDate: "2017-07-01",
      endDate: "2020-10-01",
      location: "Taipei, Taiwan",
      description:
        "We developed API and web services using Java as the back-end language, combined with Vue.js as the front-end framework and Highcharts.js as the charting library for data visualization and digitization.",
    },
  ]);
  const addExperience = () => {
    setEditingIndex(experience.length);
    setExperience([
      ...experience,
      {
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      },
    ]);
  };

  return (
    <div>
      <h3 className="my-2">Experience</h3>
      {experience.map((exp, index) => (
        <ExperienceItem
          setEditingIndex={setEditingIndex}
          editing={index === editingIndex}
          experienceItem={Object.assign({}, exp)}
          key={exp.company}
        />
      ))}
      <button className="mt-3" onClick={addExperience}>
        Add Experience
      </button>
    </div>
  );
}
