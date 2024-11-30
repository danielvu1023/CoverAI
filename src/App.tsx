import { useState, useEffect } from "react";
function App() {
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [skills, setSkills] = useState("");
  const [listOfSkills, setListOfSkills] = useState<string[]>([]);
  const [resume, setResume] = useState<any>(null);
  useEffect(() => {
    chrome.storage.session.get(["jobDescription"], (result) => {
      if (result.jobDescription) {
        setJobDescription(result.jobDescription);
      }
    });
  }, []);
  useEffect(() => {
    chrome.storage.session.get("jobDescriptionContent", (result) => {
      if (result.jobDescriptionContent) {
        console.log("result", result.jobDescriptionContent);
        setSkills(result.jobDescriptionContent);
      }
    });
  }, []);
  useEffect(() => {
    async function getAIResponse() {
      // setLoading(true);
      //@ts-ignore
      const writer = await ai.writer.create({ sharedContext: "resume" });
      console.log("job", jobDescription);
      const bullets = splitIntoBullets(jobDescription);
      const listOfSuggestions = [];

      for (const bullet of bullets) {
        const result = await writer.write(
          `Create a single ideal resume bullet point outlining a work experience that matches this description: ${bullet}`
        );
        listOfSuggestions.push(result);
      }
      setSuggestions(listOfSuggestions);
      // setLoading(false);
    }
    getAIResponse();
  }, [jobDescription]);
  useEffect(() => {
    async function getSkills() {
      const { available } =
        //@ts-ignore
        await ai.languageModel.capabilities();

      if (available !== "no") {
        setLoading(true);
        //@ts-ignore
        const session = await ai.languageModel.create();
        console.log("skill", skills);
        // Prompt the model and wait for the whole result to come back.
        const result = await session.prompt(
          `Can you only provide a summary, experience, and technology section for a resume based on this job description: ${skills}`
        );
        console.log("result", result);
        const parsedResume = parseResume(result);
        console.log(parsedResume);
        setResume(parsedResume);
        setLoading(false);
        // const skillsArray = convertListToArray(result);
        // setListOfSkills(["hey"]);
        session.destroy();
      }
    }
    getSkills();
  }, [skills]);
  const handleFileChange = (event: any) => {
    const selectedFile: File | undefined = event.target.files[0];
    if (!selectedFile) {
      return;
    }
    const reader = new FileReader();
    reader.onload = async function (e) {
      if (e.target?.result) {
        const arrayBuffer = e.target.result;
        chrome.runtime.sendMessage(
          {
            action: "processFile",
            data: arrayBufferToBase64(arrayBuffer as ArrayBuffer),
          },
          (response) => {
            if (response && response.success) {
              console.log("response", response);
            } else {
              console.error("Error processing file");
            }
          }
        );
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };
  return (
    <div>
      <h1>All sites sidepanel extension</h1>
      <button
        onClick={() => {
          chrome.runtime.sendMessage({
            action: "parseContent",
          });
        }}
      >
        Parse Content
      </button>
    </div>
  );
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
  // );
}

export default App;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer);
  const numberArray: number[] = Array.from(uint8Array);
  const binary = String.fromCharCode.apply(null, numberArray);
  return btoa(binary);
}

function splitIntoBullets(text: string): string[] {
  // Use a regular expression to split the text into sentences.
  const sentences = text
    .split(/(?<=[.!?])\s+/) // Split on punctuation followed by whitespace.
    .map((sentence) => sentence.trim()) // Remove leading/trailing whitespace.
    .filter((sentence) => sentence.length > 0); // Remove empty sentences.

  return sentences;
}
function convertListToArray(listString: string): string[] {
  return listString
    .trim() // Remove any leading or trailing whitespace
    .split("\n") // Split the string by newlines
    .map((item) => item.replace(/^ \* /, "").trim()); // Remove leading "* " and trim whitespace
}

// things all are all out of wack
function parseResume(rawText: string) {
  if (!rawText || typeof rawText !== "string") {
    console.warn("Invalid input: rawText must be a non-empty string.");
    return {};
  }

  const sections = rawText.split(/## /).slice(1); // Split into sections by headers, remove empty item at index 0
  const resume = {} as any;

  sections.forEach((section) => {
    const [header, content] = section.split(/\n\n/, 2) || []; // Split by first empty line
    if (!header || !content) {
      console.warn("Invalid section detected: Missing header or content.");
      return;
    }

    const cleanedHeader = header.trim().toLowerCase().replace(/\s+/g, "_"); // Normalize header names

    if (cleanedHeader === "summary") {
      resume.summary = content.trim();
    } else if (cleanedHeader === "experience") {
      resume.experience = parseExperience(content);
    } else if (cleanedHeader === "technology") {
      resume.technology = parseTechnology(content);
    }
  });

  return resume;
}

function parseExperience(content: string) {
  if (!content || typeof content !== "string") {
    console.warn("Invalid experience content.");
    return [];
  }

  const roles = content.split(/\n\n/); // Split by blank lines
  return roles
    .map((role) => {
      const lines = role.trim().split("\n");
      if (lines.length === 0) {
        console.warn("Empty role detected.");
        return null;
      }

      const [titleLine, ...responsibilitiesLines] = lines;
      if (!titleLine) {
        console.warn("Missing title line in experience role.");
        return null;
      }

      const [title = "", company = "", dates = ""] = titleLine.split(" | "); // Split by pipe separator

      return {
        title: title.trim().replace(/\*\*/, ""), // Remove Markdown syntax (**)
        company: company.trim(),
        dates: dates.trim(),
        responsibilities: responsibilitiesLines.map((line) =>
          line.replace(/^\* /, "").trim()
        ), // Remove bullets
      };
    })
    .filter((role) => role !== null); // Remove null entries
}

function parseTechnology(content: string) {
  if (!content || typeof content !== "string") {
    console.warn("Invalid technology content.");
    return {};
  }

  const lines = content.trim().split("\n");
  const tech = {} as any;

  lines.forEach((line) => {
    const [category, items] = line.split(":") || [];
    if (!category || !items) {
      console.warn(
        "Invalid technology line detected: Missing category or items."
      );
      return;
    }

    const cleanedCategory = category
      .trim()
      .toLowerCase()
      .replace(/\s+&?\s+/g, "_"); // Normalize key
    tech[cleanedCategory] = items.split(",").map((item) => item.trim()); // Split items by commas
  });

  return tech;
}
