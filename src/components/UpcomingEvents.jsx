import React from "react";
import "./UpcomingEvents.css";

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
      <div class="card">
        <h1>Upcoming Events</h1>
        <div class="timeline">
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
