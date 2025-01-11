import RetroGrid from "./ui/retro-grid";
import ScrollProgress from "./ui/scroll-progress";
import TypingAnimation from "./ui/typing-animation";
import { TextAnimate } from "./ui/text-animate";

import React from 'react'

function Hero() {
  return (
    <div className="relative flex h-[700px] w-full flex-col items-center justify-center rounded-lg bg-background md:shadow-xl">
           <ScrollProgress className="top-[88px]" />
           <TextAnimate animation="blurIn" by="text">
      <span className="z-10 whitespace-pre-wrap bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-center md:text-8xl text-6xl font-bold leading-none tracking-tighter text-transparent">
        The Debugging Society
      </span>
      </TextAnimate>
      <TypingAnimation className={"mt-4 p-2 text-2xl md:text-4xl text-center"}>We Teach, Code And Compete</TypingAnimation>
      <RetroGrid />
    </div>

  )
}

export default Hero
