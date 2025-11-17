"use client";

import Form from "next/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";

/**
 *
 * @returns Button with dropdown menu to select year
 */
const SelectYear = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isYearOpen, setIsYearOpen] = useState(false);
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const pathName = usePathname();

  const years = Array.from(
    { length: 20 },
    (_, i) => new Date().getFullYear() - 16 + i
  );

  // When an element in the single option is clicked, modify the query and submit the form
  const handleButtonClick = (value: string) => {
    if (formRef.current) {
      // Set the hidden input value
      const input = formRef.current.querySelector(
        `input[name="year"]`
      ) as HTMLInputElement;
      if (input) {
        input.value = value;
      }
      // Submit the form
      formRef.current.requestSubmit();
    }
  };

  useEffect(() => {
    router.push(pathName);
  }, [router]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsYearOpen(!isYearOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-yellow-500 rounded hover:bg-gray-700"
      >
        {selectedYear} <SlArrowDown />
      </button>
      {isYearOpen && (
        <Form
          ref={formRef}
          action="/events/calendar"
          className="absolute z-10 mt-1 w-32 bg-gray-800 border border-yellow-500 rounded max-h-60 overflow-y-auto"
        >
          {/* Preserve all existing search params EXCEPT the current query param */}
          {Array.from(searchParams.entries())
            .filter(([key]) => key !== "year")
            .map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}

          {/* Hidden input for the current query */}
          <input type="hidden" name="year" value="" />

          {years.map((year) => (
            <div
              key={year}
              onClick={() => {
                setSelectedYear(year);
                setIsYearOpen(false);
                handleButtonClick(year.toString());
              }}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              {year}
            </div>
          ))}
        </Form>
      )}
    </div>
  );
};

export default SelectYear;
