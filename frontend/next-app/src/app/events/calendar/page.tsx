"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import SidePanel from "./components/SidePanel";
import Calendar from "./components/Calendar";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

// Needs some fetch request
const eventGroups: EventInformation[][] = [
  [
    {
      id: "6a4ea479-7078-4ed1-b018-0c4bedca7edd",
      title: "Photography Event",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, expedita! Eligendi voluptates hic iure consectetur, dolorum ipsum. Possimus quibusdam assumenda quisquam, quos vel consequuntur libero officia voluptatum veniam quidem ducimus.",
      start_at: "2025-11-12T03:46:33.553+00:00",
      end_at: "2025-11-12T03:47:33.553+00:00",
      location: "string",
      club_id: "4a55f963-090e-43e7-b3a4-07a44d0b3585",
      club_name: "Photography",
      banner:
        "https://zpurdydmbdgqdsicfuaw.supabase.co/storage/v1/object/public/test_bucket/FurryBanner.png",
    },
    {
      id: "b0a9e34a-97ed-433a-8572-5ed1c6b7bf7e",
      title: "Furry Club Meetup",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, expedita! Eligendi voluptates hic iure consectetur, dolorum ipsum. Possimus quibusdam assumenda quisquam, quos vel consequuntur libero officia voluptatum veniam quidem ducimus.",
      start_at: "2025-11-20T19:00:00+00:00",
      end_at: "2025-11-20T21:00:00+00:00",
      location: "SJ Hall, Room 204",
      club_id: "3c8366fb-c02d-4baa-9de3-ac230ac8be4a",
      club_name: "Furry @ Yorku",
      banner:
        "https://zpurdydmbdgqdsicfuaw.supabase.co/storage/v1/object/public/test_bucket/FurryBanner.png",
    },
    {
      id: "1",
      title: "Furry Club Meetup",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, expedita! Eligendi voluptates hic iure consectetur, dolorum ipsum. Possimus quibusdam assumenda quisquam, quos vel consequuntur libero officia voluptatum veniam quidem ducimus.",
      start_at: "2025-11-20T19:00:00+00:00",
      end_at: "2025-11-20T21:00:00+00:00",
      location: "SJ Hall, Room 204",
      club_id: "3c8366fb-c02d-4baa-9de3-ac230ac8be4a",
      club_name: "Furry @ Yorku",
      banner:
        "https://zpurdydmbdgqdsicfuaw.supabase.co/storage/v1/object/public/test_bucket/FurryBanner.png",
    },
    {
      id: "2",
      title: "Furry Club Meetup",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, expedita! Eligendi voluptates hic iure consectetur, dolorum ipsum. Possimus quibusdam assumenda quisquam, quos vel consequuntur libero officia voluptatum veniam quidem ducimus.",
      start_at: "2025-11-20T19:00:00+00:00",
      end_at: "2025-11-20T21:00:00+00:00",
      location: "SJ Hall, Room 204",
      club_id: "3c8366fb-c02d-4baa-9de3-ac230ac8be4a",
      club_name: "Furry @ Yorku",
      banner:
        "https://zpurdydmbdgqdsicfuaw.supabase.co/storage/v1/object/public/test_bucket/FurryBanner.png",
    },
  ],
  [
    {
      id: "6a4ea479-7078-4ed1-b018-0c4bedca7edd",
      title: "Photography Event",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, expedita! Eligendi voluptates hic iure consectetur, dolorum ipsum. Possimus quibusdam assumenda quisquam, quos vel consequuntur libero officia voluptatum veniam quidem ducimus.",
      start_at: "2025-11-15T03:46:33.553+00:00",
      end_at: "2025-11-15T03:47:33.553+00:00",
      location: "string",
      club_id: "4a55f963-090e-43e7-b3a4-07a44d0b3585",
      club_name: "Photography",
      banner:
        "https://zpurdydmbdgqdsicfuaw.supabase.co/storage/v1/object/public/test_bucket/FurryBanner.png",
    },
  ],
  [
    {
      id: "b0a9e34a-97ed-433a-8572-5ed1c6b7bf7e",
      title: "Furry Club Meetup",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, expedita! Eligendi voluptates hic iure consectetur, dolorum ipsum. Possimus quibusdam assumenda quisquam, quos vel consequuntur libero officia voluptatum veniam quidem ducimus.",
      start_at: "2025-11-30T19:00:00+00:00",
      end_at: "2025-11-30T21:00:00+00:00",
      location: "SJ Hall, Room 204",
      club_id: "3c8366fb-c02d-4baa-9de3-ac230ac8be4a",
      club_name: "Furry @ Yorku",
      banner:
        "https://zpurdydmbdgqdsicfuaw.supabase.co/storage/v1/object/public/test_bucket/FurryBanner.png",
    },
  ],
];

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
 * @param {ReadonlyURLSearchParams} searchParams - Current search parameters
 * @param {EventInformation[][]} eventGroups - Array of event groups that belong in the same month
 * @returns Map of month dates to event groups
 */
const getDays = (
  searchParams: ReadonlyURLSearchParams,
  eventGroups: EventInformation[][]
) => {
  const days: Map<Date, EventInformation[] | null> = new Map<
    Date,
    EventInformation[]
  >();
  let date = new Date();
  const year =
    searchParams.get("year") === null
      ? date.getFullYear()
      : Number(searchParams.get("year"));
  const month =
    searchParams.get("month") === null
      ? date.getMonth()
      : Number(searchParams.get("month"));
  date = new Date(year, month, 1);
  let eventGroupsIndex = 0;
  let eventGroupsLength = eventGroups.length;

  do {
    if (
      eventGroupsIndex < eventGroupsLength &&
      new Date(eventGroups[eventGroupsIndex][0].start_at).getUTCDate() ===
        date.getUTCDate()
    ) {
      days.set(date, eventGroups[eventGroupsIndex]);
      eventGroupsIndex++;
    } else {
      days.set(date, null);
    }
    date = new Date(year, month, date.getDate() + 1);
  } while (date.getMonth() === month);

  return days;
};

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
  const startMinute = startDate.getMinutes().toString().padStart(2, "0"); // Ensures two-digit minutes
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes().toString().padStart(2, "0"); // Ensures two-digit minutes

  return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
}

/**
 *
 * @returns Calendar page
 */
const page = () => {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<
    EventInformation[] | null
  >(null);
  const days = getDays(searchParams, eventGroups);

  // Handler to update selected date and events
  const handleCellClick = (date: Date, events: EventInformation[] | null) => {
    setSelectedDate(date);
    setSelectedEvents(events);
  };

  useEffect(() => {
    // Find today's date in the days Map by comparing date values
    let todayEvents: EventInformation[] | null = null;

    for (const [date, events] of days.entries()) {
      if (date.getDate() === selectedDate.getDate()) {
        todayEvents = events;
        break;
      }
    }

    setSelectedEvents(todayEvents);
    console.log(todayEvents);
  }, [searchParams]);

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

export default page;
