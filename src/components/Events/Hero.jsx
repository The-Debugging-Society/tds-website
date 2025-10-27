import React, { useState, useEffect, useRef } from "react";
import { event1, event2, event3, event4, event5 } from "../../assets/images";

export default function HeroOfEvent() {
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const images = [event1, event2, event3, event4, event5];
  const handleHover = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 500);
  };

  const handleHoverLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="bg-black flex items-center">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-white uppercase tracking-wider text-xl font-medium">
                EVENTS
              </h2>
              <h1 className="text-white text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
                JOIN US IRL
              </h1>
            </div>
            <p className="text-gray-400 text-xl sm:text-2xl leading-relaxed">
              We pride ourselves on meeting and hanging out with our community
              in real life. Come join us at a number of conferences and hangouts
              throughout the year.
            </p>
          </div>
          <div className="relative md:col-span-2 lg:col-span-1">
            <img
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverLeave}
              src={images[imageIndex]}
              className="event-image"
              alt="Event visuals"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
