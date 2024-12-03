import React, { useState } from "react";
import type { ExperienceInfo } from "../../types";

export default function ExperienceItem({
  experienceItem,
  editing = false,
  setEditingIndex,
}: {
  experienceItem: ExperienceInfo;
  editing?: boolean;
  setEditingIndex: (b: null) => void;
}) {
  const [exp, setExp] = useState<ExperienceInfo>(
    Object.assign({}, experienceItem)
  );
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const fieldName = event.target.name as keyof ExperienceInfo;
    setExp({ ...exp, [fieldName]: event.target.value });
  };

  return (
    <div className="experience-item">
      {editing ? (
        <div>
          <input
            type="text"
            className="my-1"
            name="jobTitle"
            placeholder="Job Title"
            value={exp.jobTitle}
            onChange={(event) => handleChange(event)}
          />
          <div className="flex my-1">
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={exp.company}
              onChange={(event) => handleChange(event)}
            />
            <span> - </span>
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(event) => handleChange(event)}
            />
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(event) => handleChange(event)}
            />
          </div>
          <input
            type="text"
            className="my-1 block"
            name="location"
            placeholder="Location"
            value={exp.location}
            onChange={(event) => handleChange(event)}
          />
          <textarea
            className="my-1 block w-full"
            name="description"
            placeholder="Description"
            value={exp.description}
            onChange={(event) => handleChange(event)}
          />
        </div>
      ) : (
        <div>
          <h4 className="font-bold py-1">{exp.jobTitle}</h4>
          <div>
            <p className="py-1">
              {exp.company} | {exp.startDate} - {exp.endDate}
            </p>
          </div>
          <p className="py-1">{exp.location}</p>
          <p className="py-1">{exp.description}</p>
        </div>
      )}
      {editing && (
        <button onClick={() => setEditingIndex(null)} className="my-1">
          Save
        </button>
      )}
    </div>
  );
}
