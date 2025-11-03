"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import CheckBox from "./CheckBoxMenu";
import SingleMenu from "./SingleMenu";

interface Prop {
  buttonText: string;
  queryParam: string;
  children: string[];
  menuType: "check" | "single";
}

export default function MenuTemplateCheckBox(props: Prop) {
  // May have to limit the size on the dropdown menu, make max width and height
  const { buttonText, children, queryParam, menuType } = props;
  const [isOpen, setIsOpen] = useState(false);
  const transClass = isOpen ? "flex" : "hidden";
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        isOpen &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggle(); // Call toggle to close the menu
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  return (
    <div
      className="relative flex items-center justify-between cursor-pointer gap-1 p-2 min-w-fit bg-white rounded-sm border-1"
      onClick={toggle}
      ref={dropdownRef}
    >
      {buttonText}
      <SlArrowDown />
      {menuType == "check" ? (
        <CheckBox children={children} isOpen={transClass} query={queryParam} />
      ) : (
        <SingleMenu
          children={children}
          isOpen={transClass}
          query={queryParam}
        />
      )}
    </div>
  );
}
