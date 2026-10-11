import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IconBinaryTree, IconBraces, IconBrandAndroid, IconBrowser, IconMessages, IconTrophy } from "@tabler/icons-react";
import TextReveal from "../ui/text-reveal";
import SectionLabel from "../ui/section-label";

gsap.registerPlugin(useGSAP, ScrollTrigger);


// Specialties from the About section; topics are the usual ground each one covers
const specialties = [
  {
    title: "Data Structures & Algorithms",
    icon: IconBinaryTree,
    topics: ["Arrays and strings", "Trees and graphs", "Dynamic programming", "Complexity analysis"],
  },
  {
    title: "Competitive Programming",
    icon: IconTrophy,
    topics: ["Contest strategy", "Problem patterns", "Number theory", "Weekly quizzes"],
  },
  {
    title: "Web Development",
    icon: IconBrowser,
    topics: ["HTML, CSS and JavaScript", "React", "Backend basics", "Deploying projects"],
  },
  {
    title: "Interview Preparation",
    icon: IconMessages,
    topics: ["Coding rounds", "Explaining your approach", "Core CS concepts", "Placement season"],
  },
  {
    title: "Android Development",
    icon: IconBrandAndroid,
    topics: ["App layouts", "Activities and lifecycle", "Storing data", "Publishing apps"],
  },
  {
    title: "C++ and Java",
    icon: IconBraces,
    topics: ["Language fundamentals", "Object-oriented programming", "STL and Collections", "Debugging"],
  },
];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function WhatWeTeach() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const rowRef = useRef(null);
  const fillRefs = useRef([]);
  const activeRef = useRef(0);
  const [reduceMotion] = useState(prefersReducedMotion);

  useGSAP(
    () => {
      // First card starts filled; the rest are empty
      fillRefs.current.forEach((fill, i) => gsap.set(fill, { "--reveal": i === 0 ? "100%" : "-40%" }));
      if (reduceMotion) return;

      // Pin the row and pan it sideways: starts offset to the right, ends with the last card in view
      const row = rowRef.current;
      const lead = () => window.innerWidth * (window.innerWidth > 1024 ? 0.35 : 0.1);
      const distance = () => row.scrollWidth - window.innerWidth;
      gsap.fromTo(
        row,
        { x: lead },
        {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top top",
            end: () => `+=${distance() + lead()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Hover: the hovered card fills from its centre, the previously active one drains
  const activate = (i) => {
    const prev = activeRef.current;
    if (i === prev) return;
    const duration = reduceMotion ? 0 : 0.45;
    gsap.to(fillRefs.current[prev], { "--reveal": "-40%", duration, ease: "power2.out" });
    gsap.to(fillRefs.current[i], { "--reveal": "100%", duration, ease: "power2.out" });
    activeRef.current = i;
  };

  return (
    <section
      ref={sectionRef}
      id="what-we-teach"
      className="surface relative w-full text-white"
      style={{ "--glow-pos": "85% 14vw", "--glow-size": "55vw 32vw" }}
    >
      <div className="w-[60%] px-[4vw] pt-[6vw] max-[1025px]:w-[85%] max-[1025px]:px-[5vw] max-[1025px]:pt-[15vw] max-md:w-full">
        <SectionLabel path="curriculum" className="mb-[1.2vw] max-[1025px]:mb-[3vw]" />
        <TextReveal stagger={0.015}>
          <h2 className="text-[5.5vw] font-semibold leading-[1.1] tracking-tight max-[1025px]:text-[7vw] max-md:text-[9vw]">
            What We Teach
          </h2>
        </TextReveal>
        <div className="mt-[1.5vw] w-[75%] max-[1025px]:mt-[4vw] max-[1025px]:w-full">
          <TextReveal splitBy="lines">
            <p className="text-[1.25vw] leading-[1.6] text-white/80 max-[1025px]:text-[2.5vw] max-md:text-[4.2vw]">
              The areas our assignments, quizzes and events focus on, from first-year fundamentals to
              placement season.
            </p>
          </TextReveal>
        </div>
      </div>

      <div
        ref={panelRef}
        className={
          reduceMotion
            ? "px-[4vw] pb-[6vw] pt-[4vw] max-[1025px]:px-[5vw]"
            : "surface-glow flex h-screen items-center overflow-hidden"
        }
        style={reduceMotion ? undefined : { "--glow-pos": "55% 55%", "--glow-size": "60% 45%" }}
      >
        <div
          ref={rowRef}
          className={
            reduceMotion
              ? "grid grid-cols-3 gap-[1.6vw] max-[1025px]:grid-cols-2 max-md:grid-cols-1 max-md:gap-[5vw]"
              : "flex w-max gap-[1.6vw] px-[4vw] will-change-transform max-[1025px]:gap-[2.5vw] max-[1025px]:px-[5vw] max-md:gap-[5vw]"
          }
        >
          {specialties.map((item, i) => (
            <div
              key={item.title}
              onMouseEnter={() => activate(i)}
              className={`relative flex shrink-0 flex-col justify-end overflow-hidden surface-card rounded-lg border border-white/15 p-[1.6vw] max-[1025px]:p-[3vw] max-md:p-[5vw] ${
                reduceMotion
                  ? "min-h-[22vw] max-[1025px]:min-h-[32vw] max-md:min-h-0"
                  : "h-[30vw] w-[27vw] max-[1025px]:h-[65vw] max-[1025px]:w-[55vw] max-md:h-[85vw] max-md:w-[75vw]"
              }`}
            >
              <div
                ref={(el) => {
                  fillRefs.current[i] = el;
                }}
                aria-hidden="true"
                className="card-fill-mask surface-blue-card absolute inset-0"
              />
              {/* Specialty icon in the card's open top corner; white reads on both the dark and filled states */}
              <span
                aria-hidden="true"
                className="absolute left-[1.6vw] top-[1.6vw] flex size-[4vw] items-center justify-center rounded-full border border-white/25 bg-white/5 max-[1025px]:left-[3vw] max-[1025px]:top-[3vw] max-[1025px]:size-[9vw] max-md:left-[5vw] max-md:top-[5vw] max-md:size-[12vw]"
              >
                <item.icon className="size-[45%]" stroke={1.5} />
              </span>
              <div className="relative">
                <h3 className="mb-[1vw] text-[2.2vw] font-medium leading-tight max-[1025px]:mb-[2vw] max-[1025px]:text-[5vw] max-md:text-[6.5vw]">
                  {item.title}
                </h3>
                <ul className="space-y-[0.4vw] max-[1025px]:space-y-[1vw] max-md:space-y-[1.8vw]">
                  {item.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-center gap-[0.7vw] text-[1.2vw] text-white/90 max-[1025px]:gap-[1.5vw] max-[1025px]:text-[3vw] max-md:gap-[2.5vw] max-md:text-[4vw]"
                    >
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-white" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
