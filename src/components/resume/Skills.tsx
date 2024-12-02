import React, { useState, useEffect } from "react";
import MarkdownBlock from "../MarkdownBlock";

function Skills({ jobSession }: { jobSession: any }) {
  const [skillLists, setSkillLists] = useState();

  useEffect(() => {
    async function getSkill() {
      if (jobSession !== null) {
        console.log("getting skill...");
        const clonedSession = await jobSession.clone();
        const skillListsResp = await clonedSession.prompt(
          `Give me only the skill list of separate by "Front-End Technologies", "Back-End Technologies", "Programming Languages" and "Tools & Platforms".`
        );
        console.log("skillListsResp", skillListsResp);
        setSkillLists(skillListsResp);
      }
    }
    getSkill();
  }, [jobSession]);

  return (
    <section>
      <h3>Technical Skills</h3>
      <div>
        {skillLists ? (
          <MarkdownBlock content={skillLists} />
        ) : (
          <div>Loading skills...</div>
        )}
      </div>
    </section>
  );
}

export default Skills;
