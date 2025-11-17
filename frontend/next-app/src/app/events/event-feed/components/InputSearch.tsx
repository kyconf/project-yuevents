"use client";

import React from "react";
import Form from "next/form";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from "next/navigation";

/**
 * @returns The input field for direct searching of events
 */
const InputSearch = () => {
  const searchParams = useSearchParams();
  const query = "search";
  return (
    <Form
      action="/events/event-feed"
      className="flex flex-1 lg:flex-none min-w-60 m-5 bg-white rounded-md border-1 divide-x-1"
    >
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}

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

      <input
        className="flex-1 p-2 focus:outline-none"
        name={query}
        placeholder="Search Events"
      />
      <button className="flex-shrink-0 p-2 cursor-pointer" type="submit">
        <IoMdSearch />
      </button>
    </Form>
  );
};

export default InputSearch;
