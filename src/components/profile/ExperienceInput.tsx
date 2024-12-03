import React, { useState } from "react";
import ExperienceItem from "./ExperienceItem";
import type { ExperienceInfo } from "../../types";
import exp from "constants";
import { WorkExperience } from "../../App";

export default function ExperienceInput({
  workExperience,
  setWorkExperience,
}: {
  workExperience: WorkExperience[];
  setWorkExperience: any;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editContent, setEditContent] = useState({
    title: "",
    company: "",
    location: "",
    description: [] as string[],
  });
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
  const handleEdit = (index: any) => {
    setEditIndex(index);
    setOpenEdit(true);
    setEditContent(workExperience[index]);
  };
  const handleSubmitEdit = () => {
    setWorkExperience((prev: WorkExperience[]) => {
      const newExperiences = [...prev];
      newExperiences[editIndex] = {
        ...newExperiences[editIndex],
        title: editContent.title,
        company: editContent.company,
        location: editContent.location,
        description: editContent.description,
      };
      return newExperiences;
    });
    setOpenEdit(false);
    setEditIndex(-1);
    setEditContent({ title: "", company: "", location: "", description: [] });
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
            <button
              onClick={() => {
                handleEdit(index);
              }}
            >
              Edit
            </button>
          </div>
        );
      })}
      {openEdit && (
        <div>
          <input
            placeholder="company"
            value={editContent.company}
            onChange={(e) => {
              setEditContent((prev) => {
                return { ...prev, company: e.target.value };
              });
            }}
          ></input>
          <input
            placeholder="title"
            value={editContent.title}
            onChange={(e) => {
              setEditContent((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
          ></input>
          <input
            placeholder="location"
            value={editContent.location}
            onChange={(e) => {
              setEditContent((prev) => {
                return { ...prev, location: e.target.value };
              });
            }}
          ></input>
          {editContent.description.map((sentence, index) => {
            return (
              <input
                onChange={(e) => {
                  setEditContent((prev) => {
                    const newDescription = [...prev.description];
                    newDescription[index] = e.target.value;
                    return { ...prev, description: newDescription };
                  });
                }}
                value={sentence}
              ></input>
            );
          })}
          <button
            onClick={() => {
              handleSubmitEdit();
            }}
          >
            Submit
          </button>
        </div>
      )}

      <button className="mt-3" onClick={addExperience}>
        Add Experience
      </button>
    </div>
  );
}
