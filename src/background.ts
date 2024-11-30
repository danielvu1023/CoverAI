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
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "jobDetails") {
    chrome.storage.session.set({
      jobDescriptionContent: message.jobDescriptionContent,
    });
  }
  if (message.type === "parseContent") {
    sendResponse({ success: true });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0]?.id!, { action: "parse_content" });
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

  chrome.sidePanel.open({ tabId: tab?.id! });
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

const LINKEDIN_ORIGIN = "https://www.linkedin.com";

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  console.log("hello", tab.url);
  if (!tab.url) return;
  const url = new URL(tab.url);
  console.log("url.origin", url.origin);
  // Enables the side panel on linkedin.com
  if (url.origin === LINKEDIN_ORIGIN) {
    console.log("open side panel");
    await chrome.sidePanel.setOptions({
      tabId,
      path: "index.html",
      enabled: true,
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
  }
});
