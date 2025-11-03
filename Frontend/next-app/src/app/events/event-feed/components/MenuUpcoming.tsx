import React from "react";
import MenuTemplate from "./MenuTemplate";

/**
 * @returns The input field for choosing upcoming or past events
 */
export default function MenuUpcoming() {
  const title = "Upcoming";
  const dropDownItems: string[] = ["Upcoming", "Past Events"];
  return (
    <MenuTemplate
      buttonText={title}
      children={dropDownItems}
      queryParam="show"
      menuType="single"
    />
  );
}
