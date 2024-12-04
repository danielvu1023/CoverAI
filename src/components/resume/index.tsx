import { useState, useEffect } from "react";
import Skills from "./Skills";
import Summary from "./Summary";
import { JobInfo } from "../../types";
import { WorkExperience } from "../../App";
import Header from "./Header";

function Resume({
  workExperience,
  skills,
  summary,
  name,
  location,
  email,
  phoneNumber,
}: {
  jobInfo: JobInfo;
  workExperience: WorkExperience[];
  skills: string[];
  summary: string;
  name: string;
  location: string;
  email: string;
  phoneNumber: string;
}) {
  return (
    <div>
      <h2>Resume</h2>
      <div className="text-center">
        <Header
          name={name}
          email={email}
          location={location}
          phoneNumber={phoneNumber}
        ></Header>
      </div>
      <div className="resume">
        <p>{summary}</p>
        {workExperience.map((exp: WorkExperience, index: any) => {
          return (
            <div className="flex flex-col">
              <p>{exp.company}</p>
              <p>{exp.title}</p>
              <p>{exp.location}</p>
              <ul>
                {" "}
                {exp.description.map((bullet) => (
                  <li>{bullet}</li>
                ))}
              </ul>
            </div>
          );
        })}
        {skills.map((skill) => {
          return <p>{skill}</p>;
        })}
      </div>
    </div>
  );
}

export default Resume;
