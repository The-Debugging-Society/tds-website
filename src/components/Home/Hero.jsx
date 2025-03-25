import RetroGrid from "../ui/retro-grid";
import TypingAnimation from "../ui/typing-animation";
import Particles from "../ui/particles";

import React from 'react'

function Hero() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-background md:shadow-xl" style={{ height: "calc(100vh - 88px)" }}>
      <span className="z-10 whitespace-pre-wrap bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-center sm:text-3xl md:text-8xl t text-4xl font-bold leading-none tracking-tighter text-transparent"
      style={{
        opacity:0.7,
        paddingBottom: "20px",
      }}
      >
        The Debugging Society
      </span>
      <TypingAnimation duration={70} className={"mt-4 p-2 text-2xl md:text-4xl text-center"}>We Teach, Code And Compete.</TypingAnimation>
      <RetroGrid />
      <Particles
        className="absolute inset-0 z-0"
        quantity={60}
        ease={80}
        color={"#90E0EF"}
        refresh
      />
    </div>

  )
}

export default Hero
