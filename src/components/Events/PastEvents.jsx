import { EventCard } from "./PastEventCards";
import React from "react";

function PastEvents() {
  const events = [
    {
      title: "Matiks League 2026",
      description:"7 day online league that turns your screen time into a serious power-up.Think fast. Play smart. Build logic, speed, and focus with quick daily challenges that actually help with mind development and yes, come with prizes too.",
      image: "/events/Matiks26.png",
      link: "https://www.instagram.com/thedebuggingsocietynsut/p/DSrilOOCY3i/",
    },
    {
      title: "Tech4Impact 2025",
      description:"Tech4impact - an event where tech innovation meets sustainable impact, Whether you're a coder, creater, or crazy dreamer - this is your chance to not just build a frontend that is seen but that also matters.",
      image:
        "https://res.cloudinary.com/dh6u0utj8/image/upload/v1761826113/Website_banner_d9ju3a.png",
      link: "https://unstop.com/hackathons/tech4impact-2025-innovision25-netaji-subhas-university-of-technology-nsut-delhi-1574739",
    },
    {
      title: "CTRL+ALT+HACK",
      description:
        "The SpaceCon Hackathon is a 24-hour innovation marathon where brilliant minds collaborate to ideate, design, and prototype solutions using Generative AI, Machine Learning, and Web 3.0/Blockchain.",
      image: "/events/hackathon.jpeg",
    },
    {
      title: "DATA SPHERE",
      description:
        "This is the data analytics event of SpaceCon. As visualization takes centre stage, the event is all about drawing insights from the given data. It is the ultimate test of your analytical skills and storytelling as it involves presenting your insights in a creative and impactful way.",
      image: "/events/datasphere.jpeg",
    },
    {
      title: "WEB-A-THON",
      description:
        "Web-a-Thon is a frontend-focused website design challenge where participants will craft visually stunning and innovative websites based on space-related problem statements. Entries will be judged on design, creativity, responsiveness, and code structure.",
      image: "/events/webthon.jpeg",
    },
    {
      title: "AI HORIZON",
      description:
        "Generative AI Challenge blends tech and creativity to explore AI's role in space exploration and storytelling. Focus on AI-driven research, planning, and missions. Workshops on AI innovations shaping human space journeys. If you're into space, AI, or creative tech, explore the future of space exploration!",
      image: "/events/aihorizon.jpeg",
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
