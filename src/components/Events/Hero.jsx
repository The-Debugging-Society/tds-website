import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextReveal from "../ui/text-reveal";
import eventsData from "../../data/events.json";

gsap.registerPlugin(useGSAP);

const photos = eventsData.photos;

export default function HeroOfEvent() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const flipTimer = useRef(null);
  const [index, setIndex] = useState(0);

  // Preload so the flipbook never shows a blank frame
  useEffect(() => {
    photos.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Touch devices can't hover, so the photos cycle on their own there
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.matchMedia("(hover: hover)").matches || reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => clearInterval(flipTimer.current), []);

  // Hover: flip through the photos like a flipbook
  const startFlip = () => {
    clearInterval(flipTimer.current);
    flipTimer.current = setInterval(() => setIndex((i) => (i + 1) % photos.length), 450);
  };
  const stopFlip = () => clearInterval(flipTimer.current);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        frameRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.out", delay: 0.2 }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-12 items-end gap-[4vw] px-[4vw] pb-[6vw] pt-[6vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[8vw] max-[1025px]:px-[5vw] max-[1025px]:pt-[12vw]"
    >
      <div className="col-span-6 max-[1025px]:col-span-1">
        <TextReveal stagger={0.015} animateOnScroll={false}>
          <h1 className="text-[10vw] font-semibold leading-[0.95] tracking-tight max-[1025px]:text-[16vw] max-md:text-[20vw]">
            Events
          </h1>
        </TextReveal>
        <div className="mt-[2.5vw] w-[85%] max-[1025px]:mt-[5vw] max-[1025px]:w-full">
          <TextReveal splitBy="lines" animateOnScroll={false} delay={0.3}>
            <p className="text-[1.6vw] font-medium leading-[1.4] text-white/85 max-[1025px]:text-[3.4vw] max-md:text-[4.6vw]">
              We pride ourselves on meeting our community in real life: hackathons, data challenges, design sprints and
              conclaves, all run by students at NSUT.
            </p>
          </TextReveal>
        </div>
      </div>

      <figure className="col-span-6 max-[1025px]:col-span-1">
        <div
          ref={frameRef}
          onMouseEnter={startFlip}
          onMouseLeave={stopFlip}
          className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-[#111a3a]"
        >
          {photos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === index ? "Students at a TDS event" : ""}
              aria-hidden={i !== index}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ))}
        </div>
        <figcaption className="mt-[1vw] text-[0.9vw] text-white/50 max-[1025px]:mt-[2vw] max-[1025px]:text-[2vw] max-md:text-[3.2vw]">
          Photos by Junoon, the photography club of NSUT
        </figcaption>
      </figure>
    </section>
  );
}
