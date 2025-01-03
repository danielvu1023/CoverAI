import React, { useState, useEffect } from "react";
import MarkdownBlock from "../MarkdownBlock";

function Summary({ jobSession }: { jobSession: any }) {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    async function getSummary() {
      if (jobSession !== null) {
        console.log("getting summary...");
        const clonedSession = await jobSession.clone();
        const summaryResp = await clonedSession.prompt(
          "Give me only the summary part."
        );
        console.log("summaryResp", summaryResp);
        setSummary(summaryResp);
      }
    }
    getSummary();
  }, [jobSession]);

  return (
    <section>
      <h3>Summary</h3>
      {summary ? (
        <MarkdownBlock content={summary} />
      ) : (
        <div>Loading summary...</div>
      )}
    </section>
  );
}

export default Summary;
