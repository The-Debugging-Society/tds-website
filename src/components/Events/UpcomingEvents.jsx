import { EventCard } from "./UpcomingEventCard";
import React from "react";
import { CalendarPlus } from "lucide-react";

function UpcomingEvent() {
  const events = [
    {
      title: "Tech4Impact 2025",
      image: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/68efbd6ed278c_tech4impact-2025.png?d=1920x557",
      link: "https://unstop.com/hackathons/tech4impact-2025-innovision25-netaji-subhas-university-of-technology-nsut-delhi-1574739"
    },   
  ];

  return events.length > 0 ? (
    <div
      className="flex rounded-3xl animate-on-scroll max-w-7xl w-full mx-auto flex-col justify-center items-center p-5 text-center"
      style={{
        boxShadow: "0px 0px 14px 1px #5e5e5e inset",
        backgroundColor: "#121212",
      }}
    >
      <div>
        {events.map((card, index) => (
          <div key={index} className="w-full cursor-pointer" onClick={() => window.open(card.link, "_blank")}>
            <EventCard
              title={card.title}
              description={card.description}
              image={card.image}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div
      className="rounded-3xl animate-on-scroll m-auto"
      style={{
        boxShadow: "0px 0px 14px 1px #5e5e5e inset",
        boxSizing: "border-box",
        padding: "50px",
        maxWidth: "1320px",
        margin: "40px auto",
        backgroundColor: "#121212",
      }}
    >
      <div className="col-span-full flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 p-8 text-center animate-in fade-in-50 w-full mx-auto">
        <CalendarPlus className="mr-2 h-24 w-24" />
        <h3 className="mt-6 text-2xl font-semibold text-white">
          No upcoming events
        </h3>
        <p className="mt-2 mb-8 max-w-sm text-center text-gray-400">
          There are no events scheduled at the moment.
          <br />
          Check back later.
        </p>
      </div>
    </div>
  );
}

export default UpcomingEvent;
