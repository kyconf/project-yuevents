"use client";
import Form from "next/form";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";

/**
 *
 * @returns Button with dropdown menu to select month
 */
const SelectMonth = () => {
  const searchParams = useSearchParams();
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const monthParam = searchParams.get("month");
    return monthParam !== null ? Number(monthParam) : new Date().getMonth();
  });
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const pathName = usePathname();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Update selectedMonth when URL params change
  useEffect(() => {
    const monthParam = searchParams.get("month");
    if (monthParam !== null) {
      setSelectedMonth(Number(monthParam));
    }
  }, [searchParams]);

  // When an element in the dropdown is clicked, modify the query and submit the form
  const handleButtonClick = (value: string) => {
    if (formRef.current) {
      // Set the hidden input value
      const input = formRef.current.querySelector(
        `input[name="month"]`
      ) as HTMLInputElement;
      if (input) {
        input.value = value;
      }
      // Submit the form
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsMonthOpen(!isMonthOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-yellow-500 rounded hover:bg-gray-700"
      >
        {months[selectedMonth]} <SlArrowDown />
      </button>
      {isMonthOpen && (
        <Form
          ref={formRef}
          action={pathName}
          className="absolute z-10 mt-1 w-40 bg-gray-800 border border-yellow-500 rounded max-h-60 overflow-y-auto"
        >
          {/* Preserve all existing search params EXCEPT month */}
          {Array.from(searchParams.entries())
            .filter(([key]) => key !== "month")
            .map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}

          {/* Hidden input for month */}
          <input type="hidden" name="month" value="" />

          {months.map((month, index) => (
            <div
              key={month}
              onClick={() => {
                setSelectedMonth(index);
                setIsMonthOpen(false);
                handleButtonClick(index.toString());
              }}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              {month}
            </div>
          ))}
        </Form>
      )}
    </div>
  );
};

export default SelectMonth;
