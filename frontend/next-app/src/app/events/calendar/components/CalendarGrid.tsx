"use client";
import React from "react";
import CalendarCell from "./CalendarCell";
import { EventInformation } from "../page";

interface Prop {
  days: Map<Date, EventInformation[] | null>;
  onCellClick: (date: Date, events: EventInformation[] | null) => void;
}

/**
 *
 * @param {Map<Date, EventInformation[] | null>} days - Map of month dates to event groups
 * @param {function} onCellClick - Function to change state of the side panel
 * @returns Grid containing calendar cells, formatted to match the month/year
 */
const CalendarGrid = ({ days, onCellClick }: Prop) => {
  const daysArray = Array.from(days.entries());
  const [firstDay] = days.keys();

  return (
    <div className="grid grid-cols-7 gap-2 min-w-210">
      <div className="text-white font-bold min-w-25">Sunday</div>
      <div className="text-white font-bold min-w-25">Monday</div>
      <div className="text-white font-bold min-w-25">Tuesday</div>
      <div className="text-white font-bold min-w-25">Wednesday</div>
      <div className="text-white font-bold min-w-25">Thursday</div>
      <div className="text-white font-bold min-w-25">Friday</div>
      <div className="text-white font-bold min-w-25">Saturday</div>

      {/* Add empty cells before the first day */}
      {firstDay &&
        Array.from({ length: firstDay.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

      {daysArray.map(([key, value]) => {
        return (
          <div key={key.toDateString()}>
            <CalendarCell date={key} events={value} onCellClick={onCellClick} />
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
