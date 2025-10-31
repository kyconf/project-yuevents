"use client";

import React from "react";
import Form from "next/form";
import { IoMdSearch } from "react-icons/io";

const InputSearch = () => {
  return (
    <Form
      action="/events/event-feed"
      className="flex flex-1 lg:flex-none min-w-60 m-5 bg-white rounded-md border-1 divide-x-1"
    >
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
      <input
        className="flex-1 p-2 focus:outline-none"
        name="search_word"
        placeholder="Search Events"
      />
      <button className="flex-shrink-0 p-2 cursor-pointer" type="submit">
        <IoMdSearch />
      </button>
    </Form>
  );
};

export default InputSearch;
