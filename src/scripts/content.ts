import * as cheerio from "cheerio";

setTimeout(getJobDetails, 3000);

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

  console.log("jobTitle", jobTitle);
  console.log("jobDescription", jobDescription);
  console.log("jobWorkTime", jobWorkTime);
}
// const article = document.querySelector("article");

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent as string;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 100);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");

//   heading?.insertAdjacentElement("afterend", badge);
// }
