import React, { useState, useEffect, useRef } from "react";

export default function HeroOfEvent() {
    const [imageIndex, setImageIndex] = useState(0);
    const intervalRef = useRef(null);
    const images = [
        "/public/event1.jpg",
        "/public/event2.jpg",
        "/public/event3.jpg",
        "/public/event4.jpg",
        "/public/event5.jpg",
      ];

    const handleHover = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 250);
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-white uppercase tracking-wider text-lg font-medium">EVENTS</h2>
                            <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">JOIN US IRL</h1>
                        </div>
                        <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                            We pride ourselves on meeting and hanging out with our community in real life. Come join us at a number of
                            conferences and hangouts throughout the year.
                        </p>
                    </div>
                    <div className="relative">
                        <img
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverLeave}
                            src={images[imageIndex]}
                            className="rounded-lg w-[600px] h-[400px] transform transition duration-300 hover:scale-105 hover:shadow-xl"
                            alt="Event visuals"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
