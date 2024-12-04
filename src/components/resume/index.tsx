import { useState, useEffect } from "react";
import Skills from "./Skills";
import Summary from "./Summary";
import { JobInfo } from "../../types";
import { WorkExperience } from "../../App";
import Header from "./Header";
import MarkdownBlock from "../../components/MarkdownBlock";

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
      {/* <h2>Resume</h2> */}
      <div className="text-center">
        <Header
          name={name}
          email={email}
          location={location}
          phoneNumber={phoneNumber}
        ></Header>
      </div>
      <div className="resume">
        <h2 className="uppercase font-bold">Summary</h2>
        <hr className="my-1 border border-blue-900" />
        <MarkdownBlock content={summary} />
        {/* <p>{summary}</p> */}
        <hr className="my-3" />
        <h2 className="uppercase font-bold">Experience</h2>
        <hr className="my-1 border border-blue-900" />
        {workExperience.map((exp: WorkExperience, index: any) => {
          return (
            <div className="flex flex-col">
              <h3 className="my-1 font-bold">
                {exp.title} | {exp.company} | {exp.location}
              </h3>
              <ul>
                {" "}
                {exp.description.map((bullet, index) => {
                  return (
                    <div className="my-1" key={bullet}>
                      <p className="font-bold">{bullet.replace(/\*/g, "")}</p>
                      {/* <MarkdownBlock content={bullet} /> */}
                    </div>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <hr className="my-3" />
        <h2 className="uppercase font-bold">Skills</h2>
        <hr className="my-1 border border-blue-900" />
        {skills.map((skill) => {
          return (
            <div key={skill} className="my-2">
              <MarkdownBlock content={skill} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Resume;
