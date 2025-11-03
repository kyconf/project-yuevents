import React from "react";
import MenuTemplate from "./MenuTemplate";

/**
 * @returns The input field for event location
 */
export default function MenuLocation() {
  const title = "Location";
  const dropDownItems: string[] = [
    "On-campus",
    "Off-campus",
    "Virtual",
    "In-person",
  ];
  return (
    <MenuTemplate
      buttonText={title}
      children={dropDownItems}
      queryParam="location"
      menuType="single"
    />
  );
}
