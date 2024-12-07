import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { EventCard } from "./components/EventCard";
import { MenuDropdown } from "./components/MenuDropdown";
import { StatusIndicator } from "./components/StatusIndicator";
import { AiChat } from "./components/AiChat";

export function App() {
  const [menuState, setMenuState] = useState({
    isOpen: false,
    currentView: null,
  });
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [eventTitle, setEventTitle] = useState<string | null>(null);
  const [randomPercentage, setRandomPercentage] = useState<number>(0);
  const [metaImageURL, setMetaImageURL] = useState("");
  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'll help you with that request.",
          isUser: false,
        },
      ]);
    }, 1000);
  };

  const handleAlert = () => {
    handleSendMessage("Can you alert me?");
  };

  const handleTrade = () => {
    handleSendMessage("Can you place order for above?");
  };

  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      if (message.type === "EVENT_TITLE_EXTRACTED") {
        // Update the event title
        setEventTitle(message.payload.eventTitle);
      }

      if (message.type === "META_IMAGE_EXTRACTED") {
        // Update the meta image URL
        setMetaImageURL(message.payload.metaImageURL);
      }
    };

    // Add message listener
    chrome.runtime.onMessage.addListener(handleMessage);

    // Cleanup listener when component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
    // Fetch the website's HTML
    const fetchEventData = async (url: string) => {
      const titleFromUrl = url.split("/").pop()?.split("?")[0]; // Extract title from URL
      if (titleFromUrl) {
        setEventTitle(titleFromUrl); // Set the event title in state

        // Call your API endpoint with the extracted title
        // try {
        //   const apiResponse = await fetch(
        //     `https://your-api-endpoint.com/events/${titleFromUrl}`
        //   );
        //   const apiData = await apiResponse.json(); // Assuming the API returns JSON
        //   console.log(apiData); // Process the API data as needed
        // } catch (error) {
        //   console.error("Error calling API:", error);
        // }

        // Generate a random percentage between 0 and 100
        const randomNum = Math.floor(Math.random() * 101);
        setRandomPercentage(randomNum); // Set the random percentage
      }
    };
    // fetchMetaTag();
    let currentUrl;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      currentUrl = tabs[0];
      fetchEventData(currentUrl.url);
    });
  }, [true]);

  return (
    <div className="relative w-[400px] h-[500px] flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-black">
      <Header
        onMenuClick={() => setMenuState((prev) => ({ ...prev, isOpen: true }))}
      />

      <MenuDropdown
        isOpen={menuState.isOpen}
        currentView={menuState.currentView}
        onClose={() => setMenuState({ isOpen: false, currentView: null })}
        onSelectOption={(option) =>
          setMenuState({ isOpen: true, currentView: option })
        }
      />

      <div className="flex-1 p-4 flex flex-col gap-4">
        <EventCard
          title={eventTitle}
          value={randomPercentage}
          onAlert={handleAlert}
          onTrade={handleTrade}
        />
        <AiChat messages={messages} onSendMessage={handleSendMessage} />
      </div>

      <StatusIndicator />
      {/* <h1>{eventTitle ? eventTitle : "Probability Score"}</h1>
      <p>Random Percentage: {randomPercentage}%</p> */}
    </div>
  );
}
