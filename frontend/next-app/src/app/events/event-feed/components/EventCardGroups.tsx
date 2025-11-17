import React from "react";
import EventCard, { EventInformation } from "./EventCard";

interface Prop {
  key: string;
  events: EventInformation[];
}

/**
 *
 * @param {EventInformation} event - The JSON casted event details from api, represents a single event
 * @returns The react component (EventCard) from the event details
 */
const getEventCard = (event: EventInformation) => {
  const { title, location, start_at, end_at, banner, id, club } = event;

  // Should change key to something truly unique
  return (
    <EventCard
      title={title}
      location={location}
      start_at={start_at}
      end_at={end_at}
      banner={banner}
      id={id}
      club={club}
      key={id}
    />
  );
};

/**
 * @param {string} key - Unique identifier for this group of events
 * @param {EventInformation[]} events - List of events for this given day 

 * @returns The event card groups component
 */
const EventCardGroups = (prop: Prop) => {
  const { events } = prop;
  if (events.length == 0) {
    return null;
  }

  let eventsDate: Date = new Date(events[0].start_at);

  return (
    <div>
      <h3 className="text-lg text-gray-800 m-1.5">
        {eventsDate.toDateString()}
      </h3>
      {events.map(getEventCard)}
    </div>
  );
};

export default EventCardGroups;
