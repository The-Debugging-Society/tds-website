import { EventCard } from "./UpcomingEventCard";
import React from "react";
import { CalendarPlus } from "lucide-react";

function UpcomingEvent() {
    const events = [];

    return (
        events.length > 0 ? <div
            className="flex rounded-3xl animate-on-scroll m-auto flex-col justify-center items-center gap-5 pt-0 text-center"
            style={{
                boxShadow: "0px 0px 14px 1px #5e5e5e inset",
                boxSizing: "border-box",
                padding: "50px",
                maxWidth: "1320px",
                margin: "40px auto",
                backgroundColor: "#121212"
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
        </div> : 
        <div className="rounded-3xl animate-on-scroll m-auto" style={{
            boxShadow: "0px 0px 14px 1px #5e5e5e inset",
            boxSizing: "border-box",
            padding: "50px",
            maxWidth: "1320px",
            margin: "40px auto",
            backgroundColor: "#121212"
        }}>
            <div className="col-span-full flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 p-8 text-center animate-in fade-in-50 w-full mx-auto">
            <CalendarPlus className="mr-2 h-24 w-24" />
          <h3 className="mt-6 text-2xl font-semibold text-white">No upcoming events</h3>
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