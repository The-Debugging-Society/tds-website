import React from "react";
import  PastEvents  from "@/components/PastEvents.jsx";
import AnimatedList from "@/components/AnimatedEvents.jsx";
import HyperText from "@/components/ui/hyper-text.jsx";

function Events() {

  return (
    <>
    <div className="relative flex flex-col items-center justify-center"><HyperText className="text-4xl text-blue-400">Upcoming Events</HyperText></div>
      <AnimatedList />
    <div className="relative flex flex-col items-center justify-center"><HyperText className="text-4xl text-blue-400">Past Events</HyperText><br/><PastEvents /> </div>
      
    </>
  );
}

export default Events;
