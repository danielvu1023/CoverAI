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
          "Give me only the skill list of separate by backend and frontend."
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
      {/* 
        <section className="section">
          <h2>Technical Skills</h2>
          <ul>
            <li>
              <strong>Front-End Technologies:</strong> React.js, Vue.js,
              Next.js, Gatsby.js, Redux, HTML, CSS, SASS/SCSS
            </li>
            <li>
              <strong>Back-End Technologies:</strong> Java, Spring Framework,
              Spring Boot, Spring MVC, SQL
            </li>
            <li>
              <strong>Programming Languages:</strong> JavaScript, TypeScript
            </li>
            <li>
              <strong>Tools & Platforms:</strong> Git, Docker, Linux
            </li>
          </ul>
        </section>
       */}
    </section>
  );
}

export default Skills;
