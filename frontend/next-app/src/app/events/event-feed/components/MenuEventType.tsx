import React from "react";
import MenuTemplate from "./MenuTemplate";

/**
 * @returns The input field for event types
 */
export default function MenuEventType() {
  const title = "Event Type";
  const dropDownItems: string[] = ["Athletics/Sports", "Workshop", "Social"];
  return (
    <MenuTemplate
      buttonText={title}
      children={dropDownItems}
      queryParam="event_type"
      menuType="check"
    />
  );
}
