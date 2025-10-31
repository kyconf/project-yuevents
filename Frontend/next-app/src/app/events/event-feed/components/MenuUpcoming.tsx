import React from "react";
import MenuTemplate from "./MenuTemplate";

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
