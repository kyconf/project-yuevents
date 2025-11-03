import Form from "next/form";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface Prop {
  children: string[];
  isOpen: "flex" | "hidden";
  query: string;
}

/**
 * A template for producing check box menus for filter fields.
 * @prop {string[]} children - The list of button field texts for the menu
 * @prop {"flex" | "hidden"} - A constant representing the visibility status of this menu
 * @prop {string} query - The name of the query parameter that the form values will be submitted under
 *
 * @returns A check box menu
 */
const CheckboxMenu = (props: Prop) => {
  const { children, isOpen, query } = props;
  const menuItems = children || [];
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize check menu items to being as all being unchecked
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    () => {
      return menuItems.reduce((acc, item) => {
        acc[item] = false;
        return acc;
      }, {} as { [key: string]: boolean });
    }
  );

  // Need to update which items have been checked
  /**
   * @param {string} item - An element of children
   *
   *  item has been checked/unchecked in the menu, update the status of the input field
   */
  const handleCheck = (item: string) => {
    setCheckedItems((prev) => {
      const newState = {
        ...prev,
        [item]: !prev[item],
      };
      // Auto-submit after state update
      setTimeout(() => handleSubmit(), 0);
      return newState;
    });
  };

  // Submit the current input value
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  // Get the combined value for the query parameter
  const getCombinedValue = () => {
    return menuItems.filter((item) => checkedItems[item]).join("%");
  };

  // Fully clear queries, refresh checkbox states
  useEffect(() => {
    console.log("changed");
    const currentValue = searchParams.get(query);
    const currentValues = currentValue ? currentValue.split("%") : [];

    setCheckedItems(() => {
      return menuItems.reduce((acc, item) => {
        acc[item] = currentValues.includes(item.replace("+", " "));
        return acc;
      }, {} as { [key: string]: boolean });
    });
  }, [searchParams, query, menuItems]);

  const combinedValue = getCombinedValue();

  return (
    <Form
      ref={formRef}
      action="/events/event-feed"
      className={`absolute top-10 z-30 flex flex-col bg-white border-1 border-gray-400 rounded-md ${isOpen}`}
    >
      {/* Preserve all existing search params EXCEPT the current query param */}
      {Array.from(searchParams.entries())
        .filter(([key]) => key !== query)
        .map(([key, value]) => (
          <input
            key={`${key}-${value}`}
            type="hidden"
            name={key}
            value={value}
          />
        ))}

      {/* Single hidden input with combined values */}
      {combinedValue && (
        <input type="hidden" name={query} value={combinedValue} />
      )}

      <div className="flex flex-col">
        {menuItems.map((child) => (
          <label
            key={child}
            className="hover:bg-blue-400 px-4 py-1 cursor-pointer"
          >
            <input
              className="cursor-pointer"
              type="checkbox"
              checked={checkedItems[child]}
              onChange={() => handleCheck(child)}
            />{" "}
            {child}
          </label>
        ))}
      </div>
    </Form>
  );
};

export default CheckboxMenu;
