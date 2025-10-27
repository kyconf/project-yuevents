import React from "react";
import EventCard, { EventInformation } from "./EventCard";

interface Prop {
  key: number;
  events: EventInformation[];
}

// Event information JSON to React Node (Event Card)
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
    />
  );
};

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
