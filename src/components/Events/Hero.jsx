import React, { useState,useEffect, useRef } from "react";

export default function HeroOfEvent() {
    const [imageIndex, setImageIndex] = useState(0);
    const intervalRef = useRef(null);
    const images = [
        "https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003210/WhatsApp_Image_2025-02-06_at_20.04.08_abbbfb4e_ujqwny.jpg",
        "https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003213/WhatsApp_Image_2025-02-06_at_20.04.25_87b34146_xqrnxm.jpg",
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739006407/WhatsApp_Image_2025-02-08_at_14.49.31_e641d0c3_ept4uw.jpg',
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739003223/WhatsApp_Image_2025-02-06_at_20.47.13_c8834e60_t28kec.jpg',
        'https://res.cloudinary.com/dqvwf3z2c/image/upload/v1739006535/WhatsApp_Image_2025-02-08_at_14.51.45_890968f5_lr6qxk.jpg'
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
                            <h2 className="text-blue-500 uppercase tracking-wider text-lg font-medium">EVENTS</h2>
                            <h1 className="text-blue-500 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">JOIN US IRL</h1>
                        </div>
                        <p className="text-blue-500 text-lg sm:text-xl leading-relaxed max-w-2xl">
                            We pride ourselves on meeting and hanging out with our community in real life. Come join us at a number of
                            conferences and hangouts throughout the year.
                        </p>
                    </div>
                    <div className="relative">
                        <img
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverLeave}
                            src={images[imageIndex]}
                            className="rounded-lg w-[600px] h-[400px]"
                            alt="Event visuals"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}