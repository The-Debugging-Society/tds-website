import { EventCard } from "./PastEventCards";
import React from "react";

function PastEvents() {
    const events = [
        {
            title: "CTRL+ALT+HACK",
            description: "The SpaceCon Hackathon is a 24-hour innovation marathon where brilliant minds collaborate to ideate, design, and prototype solutions using Generative AI, Machine Learning, and Web 3.0/Blockchain.",
            image: "https://spacecon.tech/ctrlalthack.png"
        },
        {
            title: "DATA SPHERE",
            description: "This is the data analytics event of SpaceCon. As visualization takes centre stage, the event is all about drawing insights from the given data. It is the ultimate test of your analytical skills and storytelling as it involves presenting your insights in a creative and impactful way.",
            image: "https://spacecon.tech/Datasphereweb.png"
        },
        {
            title: "WEB-A-THON",
            description: "Web-a-Thon is a frontend-focused website design challenge where participants will craft visually stunning and innovative websites based on space-related problem statements. Entries will be judged on design, creativity, responsiveness, and code structure.",
            image: "https://spacecon.tech/webathon.png"
        },
        {
            title: "AI HORIZON",
            description: "Generative AI Challenge blends tech and creativity to explore AI's role in space exploration and storytelling. Focus on AI-driven research, planning, and missions. Workshops on AI innovations shaping human space journeys. If you're into space, AI, or creative tech, explore the future of space exploration!",
            image: "https://spacecon.tech/aihorizon.png"
        }
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
                backgroundColor: "#121212"
            }}>
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