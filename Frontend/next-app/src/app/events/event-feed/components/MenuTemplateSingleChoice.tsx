"use client";

import Form from "next/form";
import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

interface Prop {
  title: string;
  children: string[];
}

export default function MenuTemplateSingleChoice(props: Prop) {
  // May have to limit the size on the dropdown menu, make max width and height
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = children || [];

  const toggle = () => {
    console.log("clicked");
    setIsOpen((old) => !old);
  };

  const transClass = isOpen ? "flex" : "hidden";

  return (
    <>
      <div
        className="flex relative items-center justify-between gap-1 p-2 min-w-fit bg-white rounded-sm border-1"
        onClick={toggle}
      >
        {title}
        <SlArrowDown />
        <Form
          action="/events/event-feed"
          className={`absolute top-10 z-30 flex flex-col bg-white border-1 border-gray-400 rounded-md ${transClass}`}
        >
          {menuItems.map((children) => (
            <button
              key={children}
              className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1"
              onClick={() => console.log("child")}
              type="submit"
            >
              {children}
            </button>
          ))}
        </Form>
      </div>
      {/* Closes the dropdown menu when clicking outside of the dropdown menu*/}
      {isOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-20"
          onClick={toggle}
        ></div>
      )}
    </>
  );
}
