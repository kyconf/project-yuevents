import React from "react";
import MenuTemplate from "./MenuTemplateCheckBox";

export default function MenuEventTags() {
  const title = "Event Tags";
  const dropDownItems: string[] = ["Free Food", "Music", "Social"];
  return <MenuTemplate title={title} children={dropDownItems} />;
}
