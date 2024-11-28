const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";

function setupContextMenu() {
  chrome.contextMenus.create({
    id: "job-description",
    title: "Highlight Core Description",
    contexts: ["selection"],
  });
}
chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "jobDetails") {
    chrome.storage.session.set({
      jobDescriptionContent: message.jobDescriptionContent,
    });
  }

  if (message.type === "processFile") {
    chrome.storage.local.set({ templateResume: message.data }).then(() => {
      console.log("value is set");
    });
    chrome.storage.local.get(["templateResume"]).then((result) => {
      console.log("Value currently is " + result.templateResume);
    });
    sendResponse({ success: true });
  }

  return true;
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
  chrome.storage.session.set({ jobDescription: data.selectionText });

  //@ts-ignore
  chrome.sidePanel.open({ tabId: tab.id });
});

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
