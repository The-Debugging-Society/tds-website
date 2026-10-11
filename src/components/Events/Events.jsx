import { HeroOfEvent, EventsNavigation } from "./index.js";

function Eventspage() {
  return (
    <div className="surface w-full text-white" style={{ "--glow-pos": "75% 14vw", "--glow-size": "55vw 34vw" }}>
      <HeroOfEvent />
      <EventsNavigation />
    </div>
  );
}

export default Eventspage;
