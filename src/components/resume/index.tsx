import { useState, useEffect } from "react";
import Skills from "./Skills";
import Summary from "./Summary";
import { JobInfo } from "../../types";

function Resume({ jobInfo }: { jobInfo: JobInfo }) {
  const [jobSession, setJobSession] = useState<any>(null);

  useEffect(() => {
    async function getAISession() {
      if (jobInfo !== null) {
        // @ts-ignore
        const session = await ai.languageModel.create({
          systemPrompt:
            "You are a job requirements analysis tool, specialized in analyzing job postings to identify required skills, experience, and other qualifications. Your goal is to provide clear and structured analysis results to help users better understand the job requirements. Providing html format." +
            `The job title is: ${jobInfo.title}.` +
            `The job description is: ${jobInfo.description}.`,
        });
        setJobSession(session);
      }
    }
    getAISession();
  }, [jobInfo]);

  return (
    <div>
      <h2>Resume</h2>

      <div className="resume">
        <Summary jobSession={jobSession} />
        <Skills jobSession={jobSession} />
        {/* 

        <section className="section">
          <h2>Professional Experience</h2>
          <h3>Front-End Engineer</h3>
          <p>
            <strong>HONGROCK Inc</strong>, Taipei, Taiwan
          </p>
          <p>
            <em>October 2020 – Present</em>
          </p>
          <ul>
            <li>
              Developed and maintained front-end applications using React.js,
              showcasing complex asset data.
            </li>
            <li>
              Enhanced UI/UX by implementing responsive and user-friendly
              designs.
            </li>
            <li>
              Collaborated with cross-functional teams to ensure seamless
              integration with back-end services.
            </li>
          </ul>

          <h3>Full-Stack Engineer</h3>
          <p>
            <strong>Mapleau Technology Inc</strong>, Taipei, Taiwan
          </p>
          <p>
            <em>July 2017 – October 2020</em>
          </p>
          <ul>
            <li>
              Built API and web services using Java and Spring Framework for
              business-critical applications.
            </li>
            <li>
              Developed data visualization solutions using Vue.js and
              Highcharts.js.
            </li>
            <li>
              Optimized system performance through efficient coding practices
              and debugging.
            </li>
          </ul>

          <h3>Intern</h3>
          <p>
            <strong>Above Technology Inc</strong>, Taipei, Taiwan
          </p>
          <p>
            <em>September 2016 – July 2017</em>
          </p>
          <ul>
            <li>Created web data parsers using Java and Jsoup library.</li>
            <li>
              Gained hands-on experience with Linux and Docker for service
              deployment.
            </li>
          </ul>
        </section>

        <section className="section">
          <h2>Education</h2>
          <p>
            <strong>Bachelor’s Degree in Information Communication</strong>
          </p>
          <p>
            <em>Asia University, July 2013 – July 2017</em>
          </p>
        </section>

        <section className="section">
          <h2>Additional Experience</h2>
          <p>
            Freelance Front-End Developer experienced in handling projects
            through online platforms, delivering tailored solutions to client
            needs.
          </p>
        </section> */}
      </div>
    </div>
  );
}

export default Resume;
