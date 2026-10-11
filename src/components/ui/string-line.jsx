import { useEffect, useRef, useState } from "react";

// How far (px) the string may bend either way; keeps the curve inside its 100px-tall SVG
const MAX_BEND = 45;

/**
 * A 1px divider drawn as an SVG curve that behaves like a plucked string: moving the cursor
 * vertically across it bends it, and on leave it wobbles back to straight with a damped sine.
 * A taller invisible hit area (the `.string-line-hit` element) keeps tracking while it is bent.
 */
export default function StringLine({ color = "rgba(255,255,255,0.4)", strokeWidth = 1 }) {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const amplitude = useRef(0);
  const phase = useRef(Math.PI / 2);
  const frame = useRef(null);
  const [reduceMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const draw = (offset) => {
    const width = wrapRef.current?.offsetWidth;
    if (!width || !pathRef.current) return;
    pathRef.current.setAttribute("d", `M 0 50 Q ${width / 2} ${50 + offset} ${width} 50`);
  };

  useEffect(() => {
    draw(0);
    const onResize = () => draw(0);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Release: shrink the bend 5% per frame while swinging it back and forth
  const settle = () => {
    draw(amplitude.current * Math.sin(phase.current));
    amplitude.current *= 0.95;
    phase.current += 0.5;
    if (Math.abs(amplitude.current) > 0.1) {
      frame.current = requestAnimationFrame(settle);
    } else {
      amplitude.current = 0;
      phase.current = Math.PI / 2;
      draw(0);
    }
  };

  const onEnter = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  };
  const onMove = (e) => {
    amplitude.current = Math.max(-MAX_BEND, Math.min(MAX_BEND, amplitude.current + e.movementY / 2));
    draw(amplitude.current);
  };
  const onLeave = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    phase.current = Math.PI / 2;
    frame.current = requestAnimationFrame(settle);
  };

  return (
    <div ref={wrapRef} className="string-line" aria-hidden="true">
      {!reduceMotion && (
        <span className="string-line-hit" onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave} />
      )}
      <svg>
        <path ref={pathRef} strokeWidth={strokeWidth} style={{ stroke: color }} />
      </svg>
    </div>
  );
}
