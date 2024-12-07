// Global variables to store extracted information
let lastExtractedTitle = null;
let lastExtractedMetaImage = null;

// Listener for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "EVENT_TITLE_EXTRACTED":
      lastExtractedTitle = message.payload.eventTitle;
      break;
    case "META_IMAGE_EXTRACTED":
      lastExtractedMetaImage = message.payload.metaImageURL;
      break;
    case "GET_EXTRACTED_INFO":
      // Respond with the last extracted information
      sendResponse({
        eventTitle: lastExtractedTitle,
        metaImageURL: lastExtractedMetaImage,
      });
      break;
  }
});

// Optional: Inject content script into active tab when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });
});
