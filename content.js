// Function to extract meta image URL
function extractMetaImage() {
  const metaTag = document.querySelector('meta[property="fc:frame:image"]');
  return metaTag ? metaTag.getAttribute("content") : null;
}

// Function to extract event title from URL
function extractEventTitleFromURL() {
  const currentURL = window.location.href;
  const urlParts = currentURL.split("/event/");
  if (urlParts.length > 1) {
    const eventPart = urlParts[1].split("?")[0];
    return decodeURIComponent(eventPart);
  }
  return null;
}

// Send message to extension context
function sendExtensionMessage(messageType, data) {
  chrome.runtime.sendMessage({
    type: messageType,
    payload: data,
  });
}

// Main extraction function
function extractPageInfo() {
  const metaImageURL = extractMetaImage();
  const eventTitle = extractEventTitleFromURL();

  // Send extracted information
  if (metaImageURL) {
    sendExtensionMessage("META_IMAGE_EXTRACTED", { metaImageURL });
  }

  if (eventTitle) {
    sendExtensionMessage("EVENT_TITLE_EXTRACTED", { eventTitle });
  }
}

// Run extraction when script loads
extractPageInfo();

// Listen for any updates or requests from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "REQUEST_PAGE_INFO") {
    extractPageInfo();
  }
});
