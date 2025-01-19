import React from "react";
import "./UpcomingEvents.css";
import FlipText from "../components/ui/flip-text";

const UpcomingEvents = () => {
  const events = [
    {
      title: "Tech Workshop 1",
      description: "Join us for an exciting workshop on emerging technologies",
      date: "Jan 16, 2025",
    },
    {
      title: "Tech Workshop 2",
      description: "Join us for an exciting workshop on emerging technologies",
      date: "Jan 17, 2025",
    },
    {
      title: "Tech Workshop 3",
      description: "Join us for an exciting workshop on emerging technologies",
      date: "Jan 18, 2025",
    },
  ];

  return (
    <>
      <div className="card">
        <div className="flex animate-on-scroll flex-col md:flex-row justify-center items-center gap-5 p-5 w-full bg-background mt-10 mb-10">
          <FlipText
            className="text-4xl font-bold -tracking-widest text-blue-500 md:text-7xl md:leading-[5rem]"
            word="Events"
          />
        </div>
        <div className="timeline">
          {events.map((event, index) => (
            <div key={index} className="event-wrapper">
              <div className="event-card">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <span className="event-date">{event.date}</span>
                <button className="rsvp-btn">RSVP</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpcomingEvents;
