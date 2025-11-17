import Header from "@/app/components/Header";
import React from "react";
import EventCardList from "./components/EventCardList";
import Filters from "./components/Filters";
import { EventInformation } from "./components/EventCard";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const initialPage = 0;
  const limit = 10;

  // Build query string from searchParams
  const params = new URLSearchParams();
  Object.entries(resolvedParams).forEach(([key, value]) => {
    if (value) {
      params.append(key, Array.isArray(value) ? value.join(",") : value);
    }
  });
  const queryString = params.toString();

  const initialGroups: EventInformation[][] = await fetch(
    `http://127.0.0.1:8000/events?offset=${initialPage}&limit=${limit}&${queryString}`
  ).then((res) => res.json());

  // Replace totalItems with some api call for total number of upcoming/past events
  return (
    <div className="flex flex-col gap-5 min-h-screen bg-gray-100">
      <Header />
      <div className="min-w-fit mx-48">
        <Filters />
        <EventCardList
          initialGroups={initialGroups}
          initialPage={initialPage}
          limit={limit}
          totalItems={100}
        />
      </div>
    </div>
  );
};

export default page;
