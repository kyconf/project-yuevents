import Form from "next/form";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";

interface Prop {
  children: string[];
  isOpen: "flex" | "hidden";
  query: string;
}

/**
 * A template for producing single option menus for filter fields.
 * @prop {string[]} children - The list of button field texts for the menu
 * @prop {"flex" | "hidden"} - A constant representing the visibility status of this menu
 * @prop {string} query - The name of the query parameter that the form values will be submitted under
 *
 * @returns A single option menu
 */
const SingleMenu = (props: Prop) => {
  const { children, isOpen, query } = props;
  const menuItems = children || [];
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  // When an element in the single option is clicked, modify the query and submit the form
  const handleButtonClick = (value: string) => {
    if (formRef.current) {
      // Set the hidden input value
      const input = formRef.current.querySelector(
        `input[name="${query}"]`
      ) as HTMLInputElement;
      if (input) {
        input.value = value;
      }
      // Submit the form
      formRef.current.requestSubmit();
    }
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
          <input key={key} type="hidden" name={key} value={value} />
        ))}

      {/* Hidden input for the current query */}
      <input type="hidden" name={query} value="" />

      {menuItems.map((child) => (
        <button
          key={child}
          className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1"
          type="button"
          onClick={() => handleButtonClick(child)}
        >
          {child}
        </button>
      ))}
    </Form>
  );
};

export default SingleMenu;
