import React from "react";
import  PastEvents  from "@/components/Events/PastEvents.jsx";
import AnimatedList from "@/components/Events/AnimatedEvents.jsx";
import FlipText from "@/components/ui/flip-text";

function Events() {

  return (
    <>
    <div className="relative flex flex-col items-center justify-center">
      <FlipText               
      className="text-4xl font-bold -tracking-widest mt-6 mb-12 text-blue-500 md:text-7xl md:leading-[5rem]"
      word="Upcoming Events" 
      />
    </div>
      <AnimatedList />
    <div className="relative flex flex-col items-center justify-center">
      <FlipText         
      className="text-4xl font-bold -tracking-widest mt-6 mb-12 text-blue-500 md:text-7xl md:leading-[5rem]"
      word={"Past Events"}
      />
      <br/>
      <PastEvents /> 
      </div>
    </>
  );
}

export default Events;
