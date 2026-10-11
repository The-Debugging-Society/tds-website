import { Link, Outlet, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "motion/react";

const tabs = [
  { label: "Upcoming", to: "/events/upcoming", match: (path) => path === "/events" || path === "/events/upcoming" },
  { label: "Past events", to: "/events/past", match: (path) => path === "/events/past" },
  { label: "Workshops", to: "/events/past-workshop", match: (path) => path === "/events/past-workshop" },
];

// Tab switcher driven by the URL, so the active pill always matches the page being shown
const EventsNavigation = () => {
  const { pathname } = useLocation();
  const current = pathname.replace(/\/$/, "");

  return (
    <MotionConfig reducedMotion="user">
      <div className="px-[4vw] pb-[8vw] max-[1025px]:px-[5vw] max-[1025px]:pb-[16vw]">
        <nav aria-label="Event categories" className="flex justify-center border-t border-white/15 pt-[4vw] max-[1025px]:pt-[8vw]">
          <ul className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
            {tabs.map((tab) => {
              const active = tab.match(current);
              return (
                <li key={tab.to}>
                  <Link
                    to={tab.to}
                    aria-current={active ? "page" : undefined}
                    className="relative block rounded-full px-5 py-2.5 text-sm font-medium md:px-7 md:text-base"
                  >
                    {active && (
                      <motion.span
                        layoutId="events-tab-indicator"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-300 ${active ? "text-[#03050c]" : "text-white/70 hover:text-white"}`}
                    >
                      {tab.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <section className="mt-[5vw] max-[1025px]:mt-[10vw]">
          <Outlet />
        </section>
      </div>
    </MotionConfig>
  );
};

export default EventsNavigation;
