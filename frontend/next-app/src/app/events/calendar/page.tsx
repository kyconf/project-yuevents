"use client";

import React, { useEffect, useState, useMemo } from "react";
import Header from "@/app/components/Header";
import SidePanel from "./components/SidePanel";
import Calendar from "./components/Calendar";
import { useSearchParams } from "next/navigation";

export interface EventInformation {
  id: string;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  banner: string;
  club_id: string;
  club_name: string;
  category?: string[];
}

/**
 *
 * @param {Date} startDate - Starting date for range
 * @param {Date} endDate - Ending date for range
 * @returns xx:xx - xx:xx, time range from startDate to endDate
 */
export function formatDateRange(startDate: Date, endDate: Date) {
  if (startDate > endDate) {
    let temp = startDate;
    startDate = endDate;
    endDate = temp;
  }

  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes().toString().padStart(2, "0");
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes().toString().padStart(2, "0");

  return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
}

/**
 *
 * @returns Calendar page
 */
const Page = () => {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<
    EventInformation[] | null
  >(null);
  const [eventGroups, setEventGroups] = useState<EventInformation[][]>([]);
  const [loading, setLoading] = useState(true);

  // Memoize year and month from search params
  const year = useMemo(() => {
    const yearParam = searchParams.get("year");
    return yearParam !== null ? Number(yearParam) : new Date().getFullYear();
  }, [searchParams]);

  const month = useMemo(() => {
    const monthParam = searchParams.get("month");
    return monthParam !== null ? Number(monthParam) : new Date().getMonth();
  }, [searchParams]);

  // Fetch event groups when year/month changes
  useEffect(() => {
    const fetchEventGroups = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://127.0.0.1:8000/events/calendar?month=${month}&year=${year}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: EventInformation[][] = await response.json();
        console.log(data);
        setEventGroups(data);
      } catch (error) {
        console.error("Failed to fetch event groups:", error);
        setEventGroups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventGroups();
  }, [year, month]);

  // Generate days map
  const days = useMemo(() => {
    const daysMap: Map<Date, EventInformation[] | null> = new Map();
    let date = new Date(year, month, 1);
    let eventGroupsIndex = 0;
    const eventGroupsLength = eventGroups.length;

    do {
      if (
        eventGroupsIndex < eventGroupsLength &&
        new Date(eventGroups[eventGroupsIndex][0].start_at).getUTCDate() ===
          date.getUTCDate()
      ) {
        daysMap.set(date, eventGroups[eventGroupsIndex]);
        eventGroupsIndex++;
      } else {
        daysMap.set(date, null);
      }
      date = new Date(year, month, date.getDate() + 1);
    } while (date.getMonth() === month);

    return daysMap;
  }, [year, month, eventGroups]);

  // Handler to update selected date and events
  const handleCellClick = (date: Date, events: EventInformation[] | null) => {
    setSelectedDate(date);
    setSelectedEvents(events);
  };

  // Update selected events when days changes or selected date changes
  useEffect(() => {
    let todayEvents: EventInformation[] | null = null;

    for (const [date, events] of days.entries()) {
      if (
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        todayEvents = events;
        break;
      }
    }

    setSelectedEvents(todayEvents);
  }, [days, selectedDate]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Calendar section - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <Calendar days={days} onCellClick={handleCellClick} />
        </div>

        {/* Side panel - fixed width, always visible */}
        <div className="w-[30%] min-w-[300px] shrink-0 overflow-auto">
          <SidePanel date={selectedDate} events={selectedEvents} />
        </div>
      </div>
    </div>
  );
};

export default Page;
