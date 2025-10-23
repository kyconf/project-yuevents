import React from "react";
import MenuTemplate from "./MenuTemplateCheckBox";

export default function MenuLocation() {
  const title = "Location";
  const dropDownItems: string[] = [
    "On-campus",
    "Off-campus",
    "Virtual",
    "In-person",
  ];
  return <MenuTemplate title={title} children={dropDownItems} />;
}
