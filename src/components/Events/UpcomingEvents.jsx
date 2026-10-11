import EventGrid from "./EventGrid";
import PillButton from "../ui/pill-button";
import eventsData from "../../data/events.json";
import { WHATSAPP_URL } from "../../lib/constants";

function UpcomingEvents() {
  const events = eventsData.upcoming;

  if (events.length > 0) return <EventGrid events={events} />;

  return (
    <div className="flex flex-col items-center gap-[1.5vw] surface-card rounded-2xl border border-white/10 px-[4vw] py-[6vw] text-center max-[1025px]:gap-[4vw] max-[1025px]:py-[12vw]">
      <p className="text-[3vw] font-semibold leading-tight tracking-tight max-[1025px]:text-[6vw] max-md:text-[8vw]">
        Nothing scheduled right now
      </p>
      <p className="max-w-[46ch] text-[1.15vw] leading-[1.6] text-white/70 max-[1025px]:text-[2.6vw] max-md:text-[4vw]">
        New events are announced in our WhatsApp community first. Join to hear about the next one.
      </p>
      <div className="mt-[1vw] max-[1025px]:mt-[2vw]">
        <PillButton href={WHATSAPP_URL}>Join the community</PillButton>
      </div>
    </div>
  );
}

export default UpcomingEvents;
