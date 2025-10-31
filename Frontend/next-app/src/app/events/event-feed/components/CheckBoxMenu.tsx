import Form from "next/form";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";

interface Prop {
  children: string[];
  isOpen: "flex" | "hidden";
  query: string;
}

const CheckboxMenu = (props: Prop) => {
  const { children, isOpen, query } = props;
  const menuItems = children || [];
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize checked items from current search params
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    () => {
      const currentValue = searchParams.get(query);
      const currentValues = currentValue ? currentValue.split("%") : [];
      return menuItems.reduce((acc, item) => {
        acc[item] = currentValues.includes(item.replace("+", "  "));
        return acc;
      }, {} as { [key: string]: boolean });
    }
  );

  const handleCheck = (item: string) => {
    console.log(item);
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

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  // Get the combined value for the query parameter
  const getCombinedValue = () => {
    return menuItems.filter((item) => checkedItems[item]).join("%");
  };

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
      <input type="hidden" name={query} value={getCombinedValue()} />

      <div className="flex flex-col">
        {menuItems.map((child) => (
          <label
            key={child}
            className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1 cursor-pointer"
          >
            <input
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
