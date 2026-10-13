import { Fragment, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import TextReveal from "../ui/text-reveal";
import SectionLabel from "../ui/section-label";
import StringLine from "../ui/string-line";
import { photoUrl } from "../../lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ACCENT = "#3b82f6";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Shown in the floating card (and the mobile thumbnail) until someone's photo is added
// Member photo that falls back to the placeholder if the image is missing (e.g. deleted from Cloudinary)
function MemberPhoto({ id, compact = false, ...size }) {
  const [failed, setFailed] = useState(false);
  if (!id || failed) return <PhotoPlaceholder compact={compact} />;
  return (
    <img
      src={photoUrl(id, size)}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-top"
    />
  );
}

function PhotoPlaceholder({ compact = false }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,#0b1124_0%,#060914_100%)]">
      <img
        src="/tds-logo-transparent.png"
        alt=""
        className={`opacity-[0.12] [filter:grayscale(1)_brightness(2.2)] ${compact ? "w-[60%]" : "w-[35%]"}`}
      />
    </div>
  );
}

/**
 * Team roster in the style of the reference site's awards list: one row per person with the
 * name set large, string-line dividers that bend under the cursor, and (desktop) a floating
 * portrait that glides to whichever row is hovered. Mobile shows a small photo in each row.
 */
export default function TeamRoster({ members }) {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);
  const rowRefs = useRef([]);
  const layerRefs = useRef([]);
  const lineRefs = useRef([]);
  const activeRef = useRef(null);
  const pointerRef = useRef(null);
  const topLayer = useRef(members.length);
  const [reduceMotion] = useState(prefersReducedMotion);

  useGSAP(
    () => {
      gsap.set(layerRefs.current, { scale: 0 });
      gsap.set(cardRef.current, { autoAlpha: 0 });
      if (reduceMotion) return;
      // Each divider draws itself in from the left as it scrolls into view
      lineRefs.current.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power2.inOut", scrollTrigger: { trigger: line, start: "top 85%", once: true } }
        );
      });
    },
    { scope: sectionRef }
  );

  // Move the card to row `i` and pop that person's photo in on top of the stack
  const showRow = (i) => {
    const list = listRef.current;
    const row = rowRefs.current[i];
    const card = cardInnerRef.current;
    if (!list || !row || !card) return;

    const listBox = list.getBoundingClientRect();
    const rowBox = row.getBoundingClientRect();
    const maxY = listBox.height - card.offsetHeight;
    const y = Math.max(0, Math.min(maxY, rowBox.top - listBox.top + rowBox.height / 2 - card.offsetHeight / 2));
    const firstShow = activeRef.current === null;
    if (reduceMotion || firstShow) gsap.set(card, { y });
    else gsap.to(card, { y, duration: 0.65, ease: "back.out(1.6)" });

    const layer = layerRefs.current[i];
    topLayer.current += 1;
    gsap.set(layer, { zIndex: topLayer.current });
    gsap.killTweensOf(layer);
    if (reduceMotion) gsap.set(layer, { scale: 1 });
    else gsap.fromTo(layer, { scale: 0 }, { scale: 1.02, duration: 0.45, ease: "power2.out" });
    rowRefs.current.forEach((r, n) => r?.toggleAttribute("data-active", n === i));
    activeRef.current = i;
  };

  // Work out which row is under the pointer (string-line hit zones overlap rows, so no per-row hover)
  const hitTest = (x, y) => {
    const index = rowRefs.current.findIndex((row) => {
      const box = row?.getBoundingClientRect();
      return box && y >= box.top && y < box.bottom && x >= box.left && x < box.right;
    });
    if (index !== -1 && index !== activeRef.current) showRow(index);
  };

  // Rows slide under a still cursor while smooth-scrolling, so re-check on every scroll frame
  useLenis(() => {
    if (pointerRef.current) hitTest(pointerRef.current.x, pointerRef.current.y);
  });

  const onListEnter = () => gsap.to(cardRef.current, { autoAlpha: 1, duration: reduceMotion ? 0 : 0.4, ease: "power2.out" });
  const onListMove = (e) => {
    pointerRef.current = { x: e.clientX, y: e.clientY };
    hitTest(e.clientX, e.clientY);
  };
  const onListLeave = () => {
    pointerRef.current = null;
    activeRef.current = null;
    rowRefs.current.forEach((r) => r?.removeAttribute("data-active"));
    gsap.to(cardRef.current, { autoAlpha: 0, duration: reduceMotion ? 0 : 0.4, ease: "power2.out" });
  };

  return (
    <section
      ref={sectionRef}
      id="team"
      style={{ "--glow-pos": "85% 18vw", "--glow-size": "45vw 32vw" }}
      className="surface px-[4vw] pb-[8vw] pt-[8vw] max-[1025px]:px-[5vw] max-[1025px]:pb-[16vw] max-[1025px]:pt-[14vw]"
    >
      <SectionLabel path="team" className="mb-[1.2vw] max-[1025px]:mb-[3vw]" />
      <TextReveal stagger={0.015}>
        <h2 className="text-[5.5vw] font-semibold leading-[1.1] tracking-tight max-[1025px]:text-[7vw] max-md:text-[9vw]">
          Meet the people
          <br />
          behind TDS
        </h2>
      </TextReveal>

      <div
        ref={listRef}
        onMouseEnter={onListEnter}
        onMouseMove={onListMove}
        onMouseLeave={onListLeave}
        className="team-roster relative mt-[4vw] max-[1025px]:mt-[8vw]"
      >
        <ol>
          {members.map((member, i) => (
            <Fragment key={`${member.role}-${member.name}`}>
              <li aria-hidden="true" className="list-none">
                <div
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className="origin-left"
                >
                  <StringLine note={i} />
                </div>
              </li>
              <li
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                data-row
                className="flex items-center gap-[4vw] py-[1.6vw] max-[1025px]:py-[4vw]"
              >
                {/* Mobile and tablet: no hover, so the photo sits in the row */}
                <div className="hidden size-[14vw] shrink-0 overflow-hidden rounded-lg max-[1025px]:block max-md:size-[16vw]">
                  <MemberPhoto id={member.photo} compact width={240} aspect="1:1" />
                </div>
                <div className="flex flex-wrap items-baseline gap-x-[1.5vw] gap-y-[0.5vw] max-[1025px]:flex-col max-[1025px]:gap-y-[1vw]">
                  <h3 className="text-[3.6vw] font-semibold leading-[1.05] tracking-tight max-[1025px]:text-[6vw] max-md:text-[7vw]">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[1.15vw] font-medium max-[1025px]:text-[2.4vw] max-md:text-[3.3vw]" style={{ color: ACCENT }}>
                    {member.role}
                  </p>
                </div>
              </li>
            </Fragment>
          ))}
          <li aria-hidden="true" className="list-none">
            <div
              ref={(el) => {
                lineRefs.current[members.length] = el;
              }}
              className="origin-left"
            >
              <StringLine note={members.length} />
            </div>
          </li>
        </ol>

        {/* Desktop: floating portrait that follows the hovered row */}
        <div
          ref={cardRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-[8%] w-[22vw] max-[1025px]:hidden"
        >
          <div
            ref={cardInnerRef}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#080c1a] shadow-2xl will-change-transform"
          >
            {members.map((member, i) => (
              <div
                key={`${member.role}-${member.name}`}
                ref={(el) => {
                  layerRefs.current[i] = el;
                }}
                className="absolute inset-0"
              >
                <MemberPhoto id={member.photo} width={700} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
