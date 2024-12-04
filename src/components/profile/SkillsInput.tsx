import React, { useState, useEffect } from "react";
export default function SkillsInput() {
  const [skills, setSkills] = useState<string[]>([]);
  useEffect(() => {
    chrome.storage.local.get("profile").then((profileData) => {
      if (profileData) {
        setSkills(profileData.profile?.skills || []);
      }
      return true;
    });
  }, []);
  useEffect(() => {
    chrome.runtime.sendMessage({
      action: "update-profile",
      profile: {
        skills: skills,
      },
    });
  }, [skills]);
  return (
    <div>
      <div>
        <h3 className="my-2">My Skills</h3>
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <span
              className="relative py-1 px-2 m-1 rounded bg-blue-500 text-white"
              key={index}
            >
              <div
                onClick={() => {
                  setSkills((prev) => prev.filter((_, i) => i !== index));
                }}
                className="absolute text-[8px] flex justify-center items-center bg-red-500 -right-1 -top-1 rounded-full w-3 h-3 cursor-pointer"
              >
                x
              </div>
              {skill}
            </span>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const skillInput = form.elements.namedItem(
              "skill"
            ) as HTMLInputElement;
            if (skillInput.value === "") return;
            setSkills((prev) => [...prev, skillInput.value]);
          }}
        >
          <input className="mr-2" name="skill" placeholder="Add a skill" />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
