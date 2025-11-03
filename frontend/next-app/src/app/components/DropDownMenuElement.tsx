import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  href: string;
}

/**
 * A template for producing drop down or hover menu elements.
 * @prop {string} name - The text of one of the menu elements
 * @prop {string} href - Clicking on the name of the menu element directs the user to this link
 *
 * @returns part of a drop down menu
 */
const DropDownMenuElement = (prop: Props) => {
  return (
    <Link
      className="block px-2 py-1 rounded-xl hover:bg-gray-200 transition-colors duration-200 text-black"
      href={prop.href}
    >
      {prop.name}
    </Link>
  );
};

export default DropDownMenuElement;
