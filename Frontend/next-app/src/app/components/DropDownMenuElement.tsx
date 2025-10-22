import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  href: string;
}

/**
 * @param prop
 * @returns link to prop.href with the given text in prop.name
 *
 * A template for producing drop down or hover menu elements.
 */

const DropDownMenuElement = (prop: Props) => {
  return (
    <Link className="block" href={prop.href}>
      <div className="block px-2 py-1 rounded-xl hover:bg-gray-200 transition-colors duration-200">
        {prop.name}
      </div>
    </Link>
  );
};

export default DropDownMenuElement;
