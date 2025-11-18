import React from "react";
import CalendarGrid from "./CalendarGrid";
import DateSelection from "./DateSelection";
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
const Calendar = ({ days, onCellClick }: Prop) => {
  return (
    <div className="grid grid-rows-[10%] m-10">
      <DateSelection />
      <CalendarGrid days={days} onCellClick={onCellClick} />
    </div>
  );
};

export default Calendar;
