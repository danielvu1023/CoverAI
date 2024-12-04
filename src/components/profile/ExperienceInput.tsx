import React, { useState, useEffect } from "react";
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
  const [experience, setExperience] = useState<ExperienceInfo[]>([]);

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
        <div className="relative" key={exp.company}>
          <ExperienceItem
            setEditingIndex={setEditingIndex}
            editing={index === editingIndex}
            experienceItem={Object.assign({}, exp)}
            key={exp.company}
          />
          <div
            onClick={() => {
              setExperience((prev) => prev.filter((_, i) => i !== index));
            }}
            className="absolute text-[8px] flex justify-center items-center bg-red-500 text-white -right-1 -top-1 rounded-full w-3 h-3 cursor-pointer"
          >
            x
          </div>
        </div>
      ))}
      {workExperience.map((exp: WorkExperience, index: any) => {
        return (
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold">{exp.company}</p>
            <p className="text-[16px]">{exp.title}</p>
            <p className="text-[16px]">{exp.location}</p>
            <ul>
              {" "}
              {exp.description.map((bullet) => (
                <li>- {bullet}</li>
              ))}
            </ul>
            <button
              onClick={() => {
                handleEdit(index);
              }}
              className="w-[20%] mt-2"
            >
              Edit
            </button>
          </div>
        );
      })}
      {openEdit && (
        <div className="flex flex-col">
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
            className="w-[20%] mt-2"
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
