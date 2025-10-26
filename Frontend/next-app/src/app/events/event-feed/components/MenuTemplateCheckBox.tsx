"use client";

import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

interface Prop {
  title: string;
  children: string[];
}

export default function MenuTemplateCheckBox(props: Prop) {
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
        className="relative flex items-center justify-between gap-1 p-2 min-w-fit bg-white rounded-sm border-1"
        onClick={toggle}
      >
        {title}
        <SlArrowDown />
        <div
          className={`absolute top-10 z-30 flex flex-col bg-white border-1 border-gray-400 rounded-md ${transClass}`}
        >
          {menuItems.map((children) => (
            <div key={children} className="hover:bg-blue-400 p-2">
              <input
                key={children}
                className=""
                type="checkbox"
                onClick={() => console.log("child")}
              />{" "}
              {children}
            </div>
          ))}
        </div>
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

/**
 * import React from "react";
import Dropdown, { MenuItem } from "./MenuItems";

interface Prop {
  title: string;
  children: string[];
}

export default function MenuTemplate(prop: Prop) {
  const menuItems: MenuItem = { title: prop.title, children: prop.children };

  return (
    <div className="flex m-5 bg-white rounded-sm border-1">
      <Dropdown item={menuItems} />
    </div>
  );
}
 */
