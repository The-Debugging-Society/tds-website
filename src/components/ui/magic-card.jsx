import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function MagicCard({
  image,
  title,
  body,
  className,
  gradientSize = 200,
  gradientColor = "#1e90ff",
  gradientOpacity = 0.8,
  gradientFrom = "#0197f6",
  gradientTo = "#0f52ba",
}) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseOut = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex flex-col items-center p-4 rounded-xl shadow-lg bg-black/40 border border-white/10 backdrop-blur-sm",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseOut}
    >
      {/* Gradient Overlays */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-xl"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-xl"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientFrom},
              ${gradientTo},
              hsl(var(--border)) 100%
            )
          `,
        }}
      />

      {/* Card Content */}
      <img
        src={image}
        alt={title}
        className="rounded-t-xl object-cover w-full h-40 z-10"
      />
      <div className="z-10 p-4 text-center">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-300 mt-2">{body}</p>
      </div>
    </div>
  );
}
