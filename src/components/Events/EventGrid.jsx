import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IconArrowUpRight } from "@tabler/icons-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function EventCard({ event }) {
  return (
    <li data-event-card className="group flex flex-col">
      <div className="relative aspect-[5/6] w-full overflow-hidden rounded-xl bg-[linear-gradient(180deg,#0b1124_0%,#060914_100%)] ring-1 ring-inset ring-white/5">
        {event.image ? (
          <img
            src={event.image}
            alt={`${event.title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:scale(1)] group-hover:[transform:scale(1.04)] motion-reduce:transition-none"
            style={event.imageStyle}
          />
        ) : (
          // Poster missing: show the title over a faint TDS mark rather than a broken image
          <div className="flex h-full w-full flex-col items-center justify-center gap-[1.5vw] p-[2vw] text-center">
            <img src="/tds-logo-transparent.png" alt="" className="w-[30%] opacity-[0.12] [filter:grayscale(1)_brightness(2.2)]" />
            <p className="text-[1.8vw] font-semibold leading-tight text-white/80 max-[1025px]:text-[3.6vw] max-md:text-[6vw]">
              {event.title}
            </p>
          </div>
        )}
      </div>

      <div className="mt-[1.2vw] flex flex-col gap-[0.5vw] max-[1025px]:mt-[3vw] max-[1025px]:gap-[1.2vw]">
        <p className="font-mono text-[0.85vw] font-medium text-[#3b82f6] max-[1025px]:text-[2vw] max-md:text-[3.4vw]">
          {event.tags.join(" • ")}
        </p>
        <h3 className="text-[1.8vw] font-semibold leading-tight tracking-tight max-[1025px]:text-[3.6vw] max-md:text-[6vw]">
          {event.title}
        </h3>
        <p className="text-[1.05vw] leading-[1.6] text-white/70 max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]">
          {event.description}
        </p>
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-[0.4vw] inline-flex w-fit items-center gap-1 text-[1vw] font-medium text-white max-[1025px]:mt-[1vw] max-[1025px]:text-[2.2vw] max-md:text-[3.8vw]"
          >
            {event.link.includes("instagram.com") ? "View post" : "View event"}
            <IconArrowUpRight size={16} stroke={1.8} />
          </a>
        )}
      </div>
    </li>
  );
}

/** Poster grid shared by the past events and workshops tabs; cards rise in row by row. */
export default function EventGrid({ events }) {
  const gridRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.set("[data-event-card]", { autoAlpha: 0 });
      ScrollTrigger.batch("[data-event-card]", {
        start: "top 90%",
        once: true,
        onEnter: (cards) =>
          gsap.fromTo(cards, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }),
      });
    },
    { scope: gridRef, dependencies: [events] }
  );

  return (
    <ul
      ref={gridRef}
      className="grid grid-cols-3 gap-x-[2vw] gap-y-[5vw] max-[1025px]:grid-cols-2 max-[1025px]:gap-x-[4vw] max-[1025px]:gap-y-[10vw] max-md:grid-cols-1 max-md:gap-y-[14vw]"
    >
      {events.map((event) => (
        <EventCard key={event.title} event={event} />
      ))}
    </ul>
  );
}
