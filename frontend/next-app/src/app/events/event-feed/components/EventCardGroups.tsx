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
  const {
    date,
    time,
    location,
    category,
    title,
    organizer,
    organizerID,
    eventID,
    banner,
  } = event;

  // Should change key to something truly unique
  return (
    <EventCard
      date={date}
      time={time}
      location={location}
      category={category}
      title={title}
      organizer={organizer}
      organizerID={organizerID}
      eventID={eventID}
      banner={banner}
      key={eventID}
      description=""
    />
  );
};

/**
 * Might require changes depending on pagination implementation
 *
 * @param {number} offset - The server side page offset
 * @param {number} limit - The number of event card groups to fetch
 * @returns EventInformation[][]
 */
export const getEventCardGroups = async (offset: number, limit: number) => {
  const events: EventInformation[][] = [
    [
      {
        title: "Convention Badge Workshop",
        time: "2PM - 4PM",
        location: "Private Location (register to display)",
        date: "Thu, Oct 23, 2025",
        category: ["Workshop"],
        organizer: "Furry @ York",
        organizerID: 1,
        eventID: 1,
        banner: "",
        description:""
      },
      {
        title: "Convention Badge Workshop",
        time: "2PM - 3PM",
        location: "Private Location (register to display)",
        date: "Thu, Oct 23, 2025",
        category: ["Workshop"],
        organizer: "Furry @ York",
        organizerID: 1,
        eventID: 2,
        banner: "",
        description: ""
      },
    ],
  ];

  try {
    // const url = `https://api/events/event?offset=${offset}&limit=${limit}`;
    // const response = await fetch(url);
    // const data = await response.json();
    return events;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`An error happened: ${error}`);
  }
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

  let eventsDate = prop.events[0].date;

  return (
    <div>
      <h3 className="text-lg text-gray-800 m-1.5">{eventsDate}</h3>
      {events.map(getEventCard)}
    </div>
  );
};

export default EventCardGroups;
