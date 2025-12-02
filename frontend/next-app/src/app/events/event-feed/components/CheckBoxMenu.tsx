import Form from "next/form";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface Prop {
  children: string[];
  ids?: string[];
  isOpen: "flex" | "hidden";
  query: string;
}

/**
 * A template for producing check box menus for filter fields.
 * @prop {string[]} children - The list of button field texts for the menu (display labels)
 * @prop {string[]} ids - The list of values corresponding to each label (optional, defaults to children)
 * @prop {"flex" | "hidden"} - A constant representing the visibility status of this menu
 * @prop {string} query - The name of the query parameter that the form values will be submitted under
 *
 * @returns A check box menu
 */
const CheckboxMenu = (props: Prop) => {
  const { children, ids, isOpen, query } = props;
  const menuItems = children || [];
  const menuIds = ids || children; // Use ids if provided, otherwise fall back to children
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize check menu items to being as all being unchecked
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    () => {
      return menuIds.reduce((acc, id) => {
        acc[id] = false;
        return acc;
      }, {} as { [key: string]: boolean });
    }
  );

  /**
   * @param {string} id - The id value corresponding to the checked item
   *
   * Item has been checked/unchecked in the menu, update the status of the input field
   */
  const handleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const newState = {
        ...prev,
        [id]: !prev[id],
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

  // Get the combined value for the query parameter (using ids)
  const getCombinedValue = () => {
    return menuIds.filter((id) => checkedItems[id]).join("%");
  };

  // Fully clear queries, refresh checkbox states
  useEffect(() => {
    const currentValue = searchParams.get(query);
    const currentValues = currentValue ? currentValue.split("%") : [];

    setCheckedItems(() => {
      return menuIds.reduce((acc, id) => {
        acc[id] = currentValues.includes(id.replace("+", " "));
        return acc;
      }, {} as { [key: string]: boolean });
    });
  }, [searchParams, query, menuIds]);

  const combinedValue = getCombinedValue();

  return (
    <Form
      ref={formRef}
      action="/events/event-feed"
      className={`absolute top-10 z-30 flex flex-col bg-white border border-gray-400 rounded-md ${isOpen}`}
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
        {menuItems.map((child, index) => {
          const id = menuIds[index];
          return (
            <label
              key={id}
              className="hover:bg-blue-400 px-4 py-1 cursor-pointer"
            >
              <input
                className="cursor-pointer"
                type="checkbox"
                checked={checkedItems[id]}
                onChange={() => handleCheck(id)}
              />{" "}
              {child}
            </label>
          );
        })}
      </div>
    </Form>
  );
};

export default CheckboxMenu;
