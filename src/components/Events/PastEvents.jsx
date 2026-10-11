import EventGrid from "./EventGrid";
import eventsData from "../../data/events.json";

function PastEvents() {
  return <EventGrid events={eventsData.past} />;
}

export default PastEvents;
