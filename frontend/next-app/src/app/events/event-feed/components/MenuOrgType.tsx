import React from "react";
import MenuTemplate from "./MenuTemplate";

/**
 * @returns The input field for organization types
 */
export default function MenuOrgType() {
  const title = "Org Type";
  const dropDownItems: string[] = ["Hobby", "Culture", "Sports"];
  return (
    <MenuTemplate
      buttonText={title}
      children={dropDownItems}
      queryParam="org_type"
      menuType="check"
    />
  );
}
