import { EventInformation } from "@/app/events/event-feed/components/EventCard";
import EventCardGroups from "@/app/events/event-feed/components/EventCardGroups";
import Link from "next/link";
import React from "react";

interface Prop {
  groupID: string;
  eventGroups: EventInformation[][] | null;
}

const UpcomingEvents = ({ groupID, eventGroups }: Prop) => {
  return (
    <div className="flex flex-col bg-gray-200 py-8 gap-6">
      <div className="flex justify-center">
        <span className="text-4xl font-thin">Upcoming Events</span>
      </div>
      {eventGroups ? (
        <div className="flex flex-col gap-5 my-5 px-40">
          {eventGroups.map((events, index) => (
            <EventCardGroups
              key={`${index}-${events[0]?.id || index}`}
              events={events}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <span className="text-xl font-thin">
            There are no upcoming events
          </span>
        </div>
      )}
      <Link
        href={`/events/event-feed?club_id=${groupID}`}
        className="flex justify-center text-blue-400 font-bold"
      >
        Discover more events
      </Link>
    </div>
  );
};

export default UpcomingEvents;
