import React from "react";
import MenuTemplate from "./MenuTemplate";

export default function MenuOrganization() {
  const title = "Organizations";
  const dropDownItems: string[] = ["Furries YU", "ABC"];
  return (
    <MenuTemplate
      buttonText={title}
      children={dropDownItems}
      queryParam="org_ids"
      menuType="check"
    />
  );
}
