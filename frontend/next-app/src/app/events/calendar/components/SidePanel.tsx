import React from "react";
import { EventInformation } from "../page";
import SideCard from "./SideCard";

interface Prop {
  date: Date;
  events: EventInformation[] | null;
}

/**
 *
 * @param {Date} date - The current date of the event group selected
 * @param {EventInformation[]} events - The event group selected
 * @returns The side panel
 */
const SidePanel = ({ date, events }: Prop) => {
  return (
    <div className="relative bg-white h-full">
      <div className="flex justify-center text-3xl font-semibold font-mono p-2 border-b">
        {date.toDateString()}
      </div>
      {!events && (
        <div className="flex flex-col items-center">
          <p className="text-red-500 pt-2 ">There are no events on this day</p>
        </div>
      )}
      {events &&
        events.map((event: EventInformation) => {
          return <SideCard key={event.id} event={event} />;
        })}
    </div>
  );
};

export default SidePanel;
