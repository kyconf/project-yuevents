"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { RiResetLeftFill } from "react-icons/ri";

/**
 * @returns Button for clearing search query
 */
const ResetQueryButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Push path without queries
  const resetQueries = () => {
    router.push(pathname);
  };

  return (
    <div
      className="flex flex-none cursor-pointer border-1 bg-white rounded-md p-2 m-5 divide-x-1"
      onClick={resetQueries}
    >
      <RiResetLeftFill />
    </div>
  );
};

export default ResetQueryButton;
