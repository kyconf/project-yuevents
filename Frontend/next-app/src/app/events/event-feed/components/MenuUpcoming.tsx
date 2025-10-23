import React from "react";
import MenuTemplate from "./MenuTemplateSingleChoice";

export default function MenuUpcoming() {
  const title = "Upcoming";
  const dropDownItems: string[] = ["Upcoming", "Past Events"];
  return <MenuTemplate title={title} children={dropDownItems} />;
}
