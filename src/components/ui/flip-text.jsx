import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function FlipText({
  word,
  duration = 0.5,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  className,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      e => {
        e.map(e => {
          if (e.isIntersecting) {
            setIsVisible(true);
            
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
  }, []);

  return (
    <div ref={ref} className="flex justify-center space-x-2">
      <AnimatePresence >
        {word.split("").map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn("origin-center drop-shadow-sm", className)}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}