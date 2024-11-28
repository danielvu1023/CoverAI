import {useState, useEffect} from "react";
function App() {
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);


  useEffect(() => {
    chrome.storage.session.get(["jobDescription"], (result) => {
      if (result.jobDescription) {
        setJobDescription(result.jobDescription);
      }
    });
   

  }, [])
  useEffect(() => {
    async function getAIResponse() {
      setLoading(true);
      //@ts-ignore
      const writer = await ai.writer.create({sharedContext: "resume"});
      console.log("job", jobDescription)
      const bullets = splitIntoBullets(jobDescription)
      const listOfSuggestions = [];

      for (const bullet of bullets) {
        const result = await writer.write(
          `Create a single ideal resume bullet point outlining a work experience that matches this description: ${bullet}`
        );
        listOfSuggestions.push(result)
      }
      setSuggestions(listOfSuggestions);
      setLoading(false)
   }
   getAIResponse();
  }, [jobDescription])
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
            type: "processFile",
            data: arrayBufferToBase64(arrayBuffer as ArrayBuffer),
          },
          (response) => {
            if (response && response.success) {
              console.log("response", response);
            } else {
              console.error("Error processing file");
            }
          },
        );
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };
  if (loading) return <p>Loading...</p>
  return (
    <div className="App text-green-500 w-[500px] h-[500px]">
      <input type="file" onChange={handleFileChange} />
      <ul>{suggestions.map((suggestion) => <li>{suggestion}</li>)}</ul>
    </div>
  );
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
   .map(sentence => sentence.trim()) // Remove leading/trailing whitespace.
   .filter(sentence => sentence.length > 0); // Remove empty sentences.

 return sentences;
}