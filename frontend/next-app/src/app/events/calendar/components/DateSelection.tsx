import React from "react";
import SelectMonth from "./SelectMonth";
import SelectYear from "./SelectYear";
import ResetQueryButton from "../../event-feed/components/ResetQueryButton";

/**
 *
 * @returns Div containing the selectors for month and year
 */
const DateSelection = () => {
  return (
    <div className="flex flex-row justify-center gap-4 place-items-center text-yellow-500 p-4">
      {/* Month Dropdown */}
      <SelectMonth />
      {/* Year Dropdown */}
      <SelectYear />
      <ResetQueryButton />
    </div>
  );
};

export default DateSelection;
