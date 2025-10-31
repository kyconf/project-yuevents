import React from "react";
import MenuTemplate from "./MenuTemplate";

export default function MenuEventTags() {
  const title = "Event Tags";
  const dropDownItems: string[] = ["Free Food", "Music", "Social"];
  return (
    <MenuTemplate
      buttonText={title}
      children={dropDownItems}
      queryParam="event_tags"
      menuType="check"
    />
  );
}
