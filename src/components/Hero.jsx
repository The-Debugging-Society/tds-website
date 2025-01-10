import RetroGrid from "./ui/retro-grid";
import ScrollProgress from "./ui/scroll-progress";

import React from 'react'

function Hero() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
           <ScrollProgress className="top-[65px]" />
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
        The Debugging Society
      </span>
 
      <RetroGrid />
    </div>
  )
}

export default Hero
