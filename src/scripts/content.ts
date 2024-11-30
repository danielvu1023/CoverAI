import * as cheerio from "cheerio";

// setTimeout(getJobDetails, 3000);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "parse_content") {
    getJobDetails();
  }
});

function getJobDetails() {
  const $ = cheerio.load(new XMLSerializer().serializeToString(document));

  const jobDetailsString = "#main .jobs-details";
  const jobTitle = $(`${jobDetailsString} h1`).text().trim();
  const jobDescription = $(`${jobDetailsString} #job-details`).text().trim();
  const jobWorkTime = $(
    `${jobDetailsString} .job-details-jobs-unified-top-card__job-insight-view-model-secondary`
  )
    .text()
    .trim();
  chrome.runtime.sendMessage({
    action: "jobDetails",
    jobDescriptionContent: jobDescription,
  });
  console.log("jobTitle", jobTitle);
  console.log("jobDescription", jobDescription);
  console.log("jobWorkTime", jobWorkTime);
}
