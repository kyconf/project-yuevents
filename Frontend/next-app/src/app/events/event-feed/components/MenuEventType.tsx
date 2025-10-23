import React from "react";
import MenuTemplate from "./MenuTemplateCheckBox";

export default function MenuEventType() {
  const title = "Event Type";
  const dropDownItems: string[] = ["Athletics/Sports", "Workshop", "Social"];
  return <MenuTemplate title={title} children={dropDownItems} />;
}
