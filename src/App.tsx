import React, { useState, useEffect, useRef } from "react";
import Resume from "./components/resume";
import ExperienceInput from "./components/profile/ExperienceInput";
import type { JobInfo } from "./types";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function App() {
  // @ts-ignore
  const [jobInfo, setJobInfo] = useState<JobInfo | null>(null);
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
  return (
    <div>
      <h1 className="text-cyan-600">Cover AI</h1>
      <div className="my-1">
        <ExperienceInput />
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
        Parse Content
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
      <p className="job-title">Apply to: {jobInfo?.title}</p>
      <hr />
      {jobInfo !== null && (
        <div ref={resumeRef}>
          <Resume jobInfo={jobInfo} />
        </div>
      )}
    </div>
  );
  // );
}

export default App;

// useEffect(() => {
//   async function getAIResponse() {
//     // setLoading(true);
//     //@ts-ignore
//     const writer = await ai.writer.create({ sharedContext: "resume" });

//     const bullets = splitIntoBullets(jobDescription);
//     const listOfSuggestions = [];

//     for (const bullet of bullets) {
//       const result = await writer.write(
//         `Create a single ideal resume bullet point outlining a work experience that matches this description: ${bullet}`
//       );
//       listOfSuggestions.push(result);
//     }
//     setSuggestions(listOfSuggestions);
//     // setLoading(false);
//   }
//   getAIResponse();
// }, [jobDescription]);

// useEffect(() => {
//   async function getSkills() {
//     const { available } =
//       //@ts-ignore
//       await ai.languageModel.capabilities();

//     if (available !== "no") {
//       setLoading(true);
//       //@ts-ignore
//       const session = await ai.languageModel.create({
//         systemPrompt:
//           "You are a job requirements analysis tool, specialized in analyzing job postings to identify required skills, experience, and other qualifications. Your goal is to provide clear and structured analysis results to help users better understand the job requirements.",
//       });
//       // Prompt the model and wait for the whole result to come back.
//       const result = await session.prompt(
//         `Can you only provide a summary, experience, and technology section for a resume based on this job description: ${skills}`
//       );
//       console.log("result", result);
//       const parsedResume = parseResume(result);
//       console.log(parsedResume);
//       setResume(parsedResume);
//       setLoading(false);
//       // const skillsArray = convertListToArray(result);
//       // setListOfSkills(["hey"]);
//       session.destroy();
//     }
//   }
//   getSkills();
// }, [skills]);
// const handleFileChange = (event: any) => {
//   const selectedFile: File | undefined = event.target.files[0];
//   if (!selectedFile) {
//     return;
//   }
//   const reader = new FileReader();
//   reader.onload = async function (e) {
//     if (e.target?.result) {
//       const arrayBuffer = e.target.result;
//       chrome.runtime.sendMessage(
//         {
//           action: "processFile",
//           data: arrayBufferToBase64(arrayBuffer as ArrayBuffer),
//         },
//         (response) => {
//           if (response && response.success) {
//             console.log("response", response);
//           } else {
//             console.error("Error processing file");
//           }
//         }
//       );
//     }
//   };
//   reader.readAsArrayBuffer(selectedFile);
// };

// if (loading) return <p>Loading Resume...</p>;
// return (
//   <div className="App text-green-500 w-[500px] h-[500px]">
//     <input type="file" onChange={handleFileChange} />
//     <ul>
//       {suggestions.map((suggestion) => (
//         <li>{suggestion}</li>
//       ))}
//     </ul>
//     <h2>Resume</h2>
//     {resume ? (
//       <div>
//         <h2> Summary</h2>
//         <p>{resume.summary}</p>
//         <h2>Technology</h2>
//         <ul>
//           {Object.entries(resume.technology).map(([key, value]) => (
//             <li>{`${key}: ${(value as string[])[0]}`}</li>
//           ))}
//         </ul>
//         <h2>Experience</h2>
//         <ul>
//           {resume.experience[0].responsibilities.map(
//             (responsibility: string) => (
//               <li>{responsibility}</li>
//             )
//           )}
//         </ul>
//       </div>
//     ) : (
//       <p>no</p>
//     )}
//     {/* {resume && (
//       <div>
//         <h2>Technology</h2>
//         <ul>
//           {Object.entries(resume.technology).map(([key, value]) => (
//             <li>{`${key}: ${(value as string[])[0]}`}</li>
//           ))}
//         </ul>
//       </div>
//     )} */}
//     {/* <p>{listOfSkills}</p> */}
//   </div>

// function arrayBufferToBase64(buffer: ArrayBuffer): string {
//   const uint8Array = new Uint8Array(buffer);
//   const numberArray: number[] = Array.from(uint8Array);
//   const binary = String.fromCharCode.apply(null, numberArray);
//   return btoa(binary);
// }

// function splitIntoBullets(text: string): string[] {
//   // Use a regular expression to split the text into sentences.
//   const sentences = text
//     .split(/(?<=[.!?])\s+/) // Split on punctuation followed by whitespace.
//     .map((sentence) => sentence.trim()) // Remove leading/trailing whitespace.
//     .filter((sentence) => sentence.length > 0); // Remove empty sentences.

//   return sentences;
// }
// function convertListToArray(listString: string): string[] {
//   return listString
//     .trim() // Remove any leading or trailing whitespace
//     .split("\n") // Split the string by newlines
//     .map((item) => item.replace(/^ \* /, "").trim()); // Remove leading "* " and trim whitespace
// }

// // things all are all out of wack
// function parseResume(rawText: string) {
//   if (!rawText || typeof rawText !== "string") {
//     console.warn("Invalid input: rawText must be a non-empty string.");
//     return {};
//   }

//   const sections = rawText.split(/## /).slice(1); // Split into sections by headers, remove empty item at index 0
//   const resume = {} as any;

//   sections.forEach((section) => {
//     const [header, content] = section.split(/\n\n/, 2) || []; // Split by first empty line
//     if (!header || !content) {
//       console.warn("Invalid section detected: Missing header or content.");
//       return;
//     }

//     const cleanedHeader = header.trim().toLowerCase().replace(/\s+/g, "_"); // Normalize header names

//     if (cleanedHeader === "summary") {
//       resume.summary = content.trim();
//     } else if (cleanedHeader === "experience") {
//       resume.experience = parseExperience(content);
//     } else if (cleanedHeader === "technology") {
//       resume.technology = parseTechnology(content);
//     }
//   });

//   return resume;
// }

// function parseExperience(content: string) {
//   if (!content || typeof content !== "string") {
//     console.warn("Invalid experience content.");
//     return [];
//   }

//   const roles = content.split(/\n\n/); // Split by blank lines
//   return roles
//     .map((role) => {
//       const lines = role.trim().split("\n");
//       if (lines.length === 0) {
//         console.warn("Empty role detected.");
//         return null;
//       }

//       const [titleLine, ...responsibilitiesLines] = lines;
//       if (!titleLine) {
//         console.warn("Missing title line in experience role.");
//         return null;
//       }

//       const [title = "", company = "", dates = ""] = titleLine.split(" | "); // Split by pipe separator

//       return {
//         title: title.trim().replace(/\*\*/, ""), // Remove Markdown syntax (**)
//         company: company.trim(),
//         dates: dates.trim(),
//         responsibilities: responsibilitiesLines.map((line) =>
//           line.replace(/^\* /, "").trim()
//         ), // Remove bullets
//       };
//     })
//     .filter((role) => role !== null); // Remove null entries
// }

// function parseTechnology(content: string) {
//   if (!content || typeof content !== "string") {
//     console.warn("Invalid technology content.");
//     return {};
//   }

//   const lines = content.trim().split("\n");
//   const tech = {} as any;

//   lines.forEach((line) => {
//     const [category, items] = line.split(":") || [];
//     if (!category || !items) {
//       console.warn(
//         "Invalid technology line detected: Missing category or items."
//       );
//       return;
//     }

//     const cleanedCategory = category
//       .trim()
//       .toLowerCase()
//       .replace(/\s+&?\s+/g, "_"); // Normalize key
//     tech[cleanedCategory] = items.split(",").map((item) => item.trim()); // Split items by commas
//   });

//   return tech;
// }
