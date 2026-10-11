import EventGrid from "./EventGrid";
import eventsData from "../../data/events.json";

function PastWorkshops() {
  return <EventGrid events={eventsData.workshops} />;
}

export default PastWorkshops;
