import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const EventsNavigation = () => {
    const { pathname } = useLocation();
    const [activeTab, setActiveTab] = useState("upcoming");

    useEffect(() => {
        const hash = pathname.split("/events/")[1]; // Get the section name
        if (hash) {
            const section = document.getElementById(hash);
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [pathname]);

    return (
        <div>
            <div className="bg-black p-4 md:p-8">
                <div className="flex flex-col items-center sm:flex-row sm:gap-4 mb-12 justify-center">
                    <Link to="/events/upcoming" className="w-[474px] h-[50px]">
                        <Button
                            variant="ghost"
                            className={`rounded-full border px-4 py-2 mb-2 md:px-8 text-sm md:text-lg font-medium transition-colors w-full h-full
                                ${
                                    activeTab === "upcoming"
                                        ? "border-transparent bg-white text-black hover:bg-gray-200"
                                        : "border-gray-700 text-gray-400 hover:bg-gray-800"
                                }`}
                            onClick={() => setActiveTab("upcoming")}
                        >
                            UPCOMING EVENTS
                        </Button>
                    </Link>
                    <Link to="/events/past" className="w-[474px] h-[50px]">
                        <Button
                            variant="ghost"
                            className={`rounded-full border px-4 py-2 mb-2 md:px-8 text-sm md:text-lg font-medium transition-colors w-full h-full
                                ${
                                    activeTab === "past"
                                        ? "border-transparent bg-white text-black hover:bg-gray-200"
                                        : "border-gray-700 text-gray-400 hover:bg-gray-800"
                                }`}
                            onClick={() => setActiveTab("past")}
                        >
                            PAST EVENTS
                        </Button>
                    </Link>
                    <Link to="/events/past-workshop" className="w-[474px] h-[50px]">
                        <Button
                            variant="ghost"
                            className={`rounded-full border px-4 py-2 mb-2 md:px-8 text-sm md:text-lg font-medium transition-colors w-full h-full
                                ${
                                    activeTab === "past workshop"
                                        ? "border-transparent bg-white text-black hover:bg-gray-200"
                                        : "border-gray-700 text-gray-400 hover:bg-gray-800"
                                }`}
                            onClick={() => setActiveTab("past workshop")}
                        >
                            PAST WORKSHOPS
                        </Button>
                    </Link>
                </div>
            </div>

            <section>
                <Outlet />
            </section>
        </div>
    );
};

export default EventsNavigation;