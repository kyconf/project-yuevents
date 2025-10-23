import React from "react";
import MenuTemplate from "./MenuTemplateCheckBox";

export default function MenuOrganization() {
  const title = "Organizations";
  const dropDownItems: string[] = ["Furries YU", "ABC"];
  return <MenuTemplate title={title} children={dropDownItems} />;
}
