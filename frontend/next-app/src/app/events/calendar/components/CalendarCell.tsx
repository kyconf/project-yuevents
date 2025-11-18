// CalendarCell.tsx
import React from "react";
import { EventInformation } from "../page";
import EventLine from "./EventLine";

interface Prop {
  date: Date;
  events: EventInformation[] | null;
  onCellClick: (date: Date, events: EventInformation[] | null) => void;
}

/**
 * @param {Date} date - The date of this calendar cell
 * @param {EventInformation[] | null} events - The list of events held on this date
 * @param {function} onCellClick - Function to change state of the side panel
 * @returns Calendar cell containing eventlines
 */
const CalendarCell = ({ date, events, onCellClick }: Prop) => {
  return (
    <div
      className="relative flex flex-col bg-gray-100 border-t-4 border-t-emerald-400 rounded-t-md h-28 min-w-25 p-0.5"
      onClick={() => onCellClick(date, events)}
    >
      <div className="ml-1 mb-2 shrink-0">
        <p className="text-sm font-semibold">{date.getDate()}</p>
      </div>
      <div className="">
        {events?.slice(0, 3).map((event) => (
          <EventLine key={event.id} event={event} />
        ))}
        {events && events.length > 3 && (
          <div className="whitespace-nowrap text-ellipsis text-xs font-bold pl-0.5">
            +{events.length - 3} more...
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarCell;
