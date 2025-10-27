import React from "react";
import InputSearch from "./InputSearch";
import MenuUpcoming from "./MenuUpcoming";
import MenuOrganization from "./MenuOrganization";
import MenuOrgType from "./OrgType";
import MenuEventType from "./MenuEventType";
import MenuEventTags from "./MenuEventTags";
import MenuLocation from "./MenuLocation";

const Filters = () => {
  return (
    <div className="flex sticky items-start -top-2 z-10 p-0.5 border-t-4 border-t-blue-400 bg-gray-300">
      <InputSearch />
      <div className="hidden lg:grid grid-cols-4 gap-0.5 my-5">
        <MenuUpcoming />
        <MenuOrganization />
        <MenuOrgType />
        <MenuEventType />
        <MenuEventTags />
        <MenuLocation />
      </div>
    </div>
  );
};

export default Filters;
