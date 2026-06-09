import { EventCard } from "./PastEventCards";
import React from "react";

function PastEvents() {
  const events = [
    {
      title: "AI Ethics & Security Workshop",
      description:"AI : Ethics & Security Conclave at NSUT brings together industry speakers and hands on sessions designed for students who want to understand technology beyond just using it.",
    image: "/events/AIEthics.jpeg",
      link: "https://www.instagram.com/p/DVDhQCgk5uc/",
    },
    
  ];

  return (
    <div
      className="flex rounded-3xl animate-on-scroll m-auto flex-col justify-center items-center gap-5 pt-0 text-center"
      style={{
        boxShadow: "0px 0px 14px 1px #5e5e5e inset",
        boxSizing: "border-box",
        padding: "50px",
        maxWidth: "1320px",
        width: "fit-content",
        margin: "40px auto",
        backgroundColor: "#121212",
      }}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {events.map((card, index) => (
          <div key={index} className="w-full flex">
            <EventCard
              title={card.title}
              description={card.description}
              image={card.image}
              style={{ height: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastEvents;
