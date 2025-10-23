import React from "react";
import MenuTemplate from "./MenuTemplateCheckBox";

export default function MenuOrgType() {
  const title = "Org Type";
  const dropDownItems: string[] = ["Hobby", "Culture", "Sports"];
  return <MenuTemplate title={title} children={dropDownItems} />;
}
