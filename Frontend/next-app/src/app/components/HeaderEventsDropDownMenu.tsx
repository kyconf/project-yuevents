import React from "react";
import DropDownMenuElement from "./DropDownMenuElement";

/**
 *
 * @returns The raw hover menu for the "Events" header
 */
const HeaderEventsDropDownMenu = () => {
  return (
    <div className="absolute z-1000 bg-white bg-cover p-1 rounded-2xl border-1 border-gray-400 text-sm">
      <DropDownMenuElement name="Calendar Events" href="/events/calendar" />
      <DropDownMenuElement name="Event Feed" href="/events/event-feed" />
      <DropDownMenuElement name="Add an Event" href="/events/post-event" />
    </div>
  );
};

export default HeaderEventsDropDownMenu;
