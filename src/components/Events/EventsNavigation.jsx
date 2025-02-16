import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const EventsNavigation = () => {
    const { pathname } = useLocation();
    const [activeTab, setActiveTab] = useState("upcoming");

    useEffect(() => {
        const hash = pathname.split("/events/")[1];
        if (hash) {
            const section = document.getElementById(hash);
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [pathname]);

    return (
        <div className="">
            <div className="bg-black p-4 md:p-8">
                <div className="flex flex-col items-center sm:flex-row sm:gap-2 md:gap-4 mb-12 justify-center">
                    <Link to="/events/upcoming" className="w-full sm:w-[474px] h-[50px] mb-4 sm:mb-0">
                        <Button
                            variant="ghost"
                            className={`rounded-full border-2 px-8 py-6 text-lg font-medium transition-colors w-full h-full
                                ${
                                    activeTab === "upcoming"
                                        ? "border-transparent bg-white text-black md:hover:bg-gray-300"
                                        : "border-gray-700 text-gray-400 md:hover:bg-gray-800 md:hover:text-white"
                                }`}
                            onClick={() => setActiveTab("upcoming")}
                        >
                            UPCOMING EVENTS
                        </Button>
                    </Link>
                    <Link to="/events/past" className="w-full sm:w-[474px] h-[50px] mb-4 sm:mb-0">
                        <Button
                            variant="ghost"
                            className={`rounded-full border-2 px-8 py-6 text-lg font-medium transition-colors w-full h-full
                                ${
                                    activeTab === "past"
                                        ? "border-transparent bg-white text-black md:hover:bg-gray-300"
                                        : "border-gray-700 text-gray-400 md:hover:bg-gray-800 md:hover:text-white"
                                }`}
                            onClick={() => setActiveTab("past")}
                        >
                            PAST EVENTS
                        </Button>
                    </Link>
                    <Link to="/events/past-workshop" className="w-full sm:w-[474px] h-[50px]">
                        <Button
                            variant="ghost"
                            className={`rounded-full border-2 px-8 py-6 text-lg font-medium transition-colors w-full h-full
                                ${
                                    activeTab === "past workshop"
                                        ? "border-transparent bg-white text-black md:hover:bg-gray-300"
                                        : "border-gray-700 text-gray-400 md:hover:bg-gray-800 md:hover:text-white"
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
