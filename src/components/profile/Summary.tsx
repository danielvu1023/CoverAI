import React, { useState, useEffect } from "react";
export default function Summary() {
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    chrome.storage.local.get("profile").then((profileData) => {
      if (profileData) {
        setSummary(profileData.profile?.summary || "");
      }
      return true;
    });
  }, []);
  useEffect(() => {
    chrome.runtime.sendMessage({
      action: "update-profile",
      profile: {
        summary: summary,
      },
    });
  }, [summary]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const summaryString = event.target.value as string;
    setSummary(summaryString);
  };

  return (
    <div className="summary">
      <h3 className="my-2">Summary</h3>
      <textarea
        className="my-1 block h-20 w-full"
        name="summary"
        placeholder="Your Profile summary"
        value={summary}
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
}
