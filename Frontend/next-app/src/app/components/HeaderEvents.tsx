"use client";

import React, { useState } from "react";
import HeaderEventsDropDownMenu from "./HeaderEventsDropDownMenu";
import Link from "next/link";

/**
 * @returns The "Events" header with hover interactivity,
 * giving user feedback when hovering over elements in the menu
 */
const HeaderEvents = () => {
  /**
   * @state {boolean} isDropVisible - Indicates if the hover menu for the "Events" header is visible
   */
  const [isDropDownVisible, setDropDownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropDownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropDownVisible(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link href="/events">Events</Link>
      {isDropDownVisible && <HeaderEventsDropDownMenu />}
    </div>
  );
};

export default HeaderEvents;
