const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";

function setupContextMenu() {
  chrome.contextMenus.create({
    id: "job-description",
    title: "Highlight Core Description",
    contexts: ["selection"],
  });
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
  setupContextMenu();
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
  chrome.storage.session.set({ jobDescription: data.selectionText });

  //@ts-ignore
  chrome.sidePanel.open({ tabId: tab.id });
});

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url?.startsWith(extensions) || tab.url?.startsWith(webstore)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id! },
      });
    } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id! },
      });
    }
  }
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
