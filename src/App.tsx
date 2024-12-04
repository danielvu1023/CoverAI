import React, { useState, useEffect, useRef } from "react";
import Resume from "./components/resume";
import Contact from "./components/profile/Contact";
import Summary from "./components/profile/Summary";
import ExperienceInput from "./components/profile/ExperienceInput";
import SkillsInput from "./components/profile/SkillsInput";
import type { JobInfo } from "./types";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import SummaryInput from "./components/resume/SummaryInput";
import SkillInput from "./components/profile/SkillInput";
export interface WorkExperience {
  company: string;
  title: string;
  location: string;
  description: string[];
}
function App() {
  // @ts-ignore
  const [jobInfo, setJobInfo] = useState<JobInfo | null>(null);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef(null);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      console.log("onChanged", changes);
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log("jobInfo", newValue);
        if (key === "jobInfo") {
          console.log("jobInfo", newValue);
        }
      }
    });
  }, []);
  useEffect(() => {
    if (!jobInfo) {
      return;
    }
    async function handleResume() {
      setLoading(true);
      await handleGenerateSummary();
      await handleGenerateSkills();
      await handleGenerateWorkExperience();
      setLoading(false);
    }
    handleResume();
  }, [jobInfo]);
  const handleGenerateSkills = async () => {
    console.log("generate skills ran");
    const { available } =
      //@ts-ignore
      await ai.languageModel.capabilities();
    console.log("available", available);
    if (available !== "no") {
      //@ts-ignore
      const session = await ai.languageModel.create();
      console.log("session", session);

      const result = await session.prompt(
        `Can you give me only a simple bulleted list of skills found in this job post: ${jobInfo?.description}`
      );

      console.log("result", result);
      const bullets = result.split("* ").filter(Boolean);

      console.log("bullets", bullets);
      setSkills(bullets);
      session.destroy();
    }
  };
  const handleGenerateSummary = async () => {
    const { available } =
      //@ts-ignore
      await ai.languageModel.capabilities();

    if (available !== "no") {
      //@ts-ignore
      const session = await ai.languageModel.create();
      const result = await session.prompt(
        `Give me a single paragraph personal summary that fits this job description: ${jobInfo?.description}`
      );

      setSummary(result);
      session.destroy();
    }
  };

  const handleGenerateWorkExperience = async () => {
    const { available } =
      //@ts-ignore
      await ai.languageModel.capabilities();

    if (available !== "no") {
      //@ts-ignore
      const session = await ai.languageModel.create();
      const result = await session.prompt(
        `Give me a sample work experience that fits the job posting below only providing a list of only 5 items: ${jobInfo?.description}`
      );

      console.log("result", result);
      const bullets = result.split("* ").filter(Boolean);
      const newWorkExperience = {
        company: "Google",
        title: "Frontend Developer",
        location: "San Jose, CA",
        description: bullets,
      };
      setWorkExperience((prev) => [...prev, newWorkExperience]);
      session.destroy();
    }
  };

  return (
    <div>
      <h1 className="text-cyan-600">Cover AI</h1>
      <h3 className="my-2">Core</h3>
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          name="name"
          className="mr-1"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          name="phoneNumber"
          className="mr-1"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>

      <div className="my-2">
        <SummaryInput summary={summary} setSummary={setSummary} />
        {/* <Summary /> */}
      </div>
      <div className="my-2">
        <SkillInput skills={skills} setSkills={setSkills}></SkillInput>
        {/* <SkillsInput /> */}
      </div>
      <div className="my-2">
        <ExperienceInput
          workExperience={workExperience}
          setWorkExperience={setWorkExperience}
        />
      </div>

      <hr className="my-2" />
      <button
        className="mr-1"
        onClick={() => {
          chrome.runtime.sendMessage(
            {
              action: "parse-content",
            },
            (jobInfoResp: JobInfo) => {
              setJobInfo(jobInfoResp);
            }
          );
        }}
      >
        Generate Resume
      </button>
      <button
        className="ml-1"
        onClick={() => {
          if (resumeRef !== null) {
            html2canvas(resumeRef?.current!).then((canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF();
              // @ts-ignore
              pdf.addImage(imgData, "JPEG", 0, 0);
              pdf.save("resume.pdf");
            });
          }
        }}
      >
        Download Resume
      </button>
      <p className="job-title py-3">Apply to: {jobInfo?.title}</p>
      <hr />

      {jobInfo !== null && (
        <div ref={resumeRef}>
          {loading ? (
            <div>Loading Resume...</div>
          ) : (
            <Resume
              jobInfo={jobInfo}
              workExperience={workExperience}
              skills={skills}
              summary={summary}
              name={name}
              location={location}
              phoneNumber={phoneNumber}
              email={email}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
