import Header from "@/app/components/Header";
import React from "react";
import EventCardList from "./components/EventCardList";
import { getEventCardGroups } from "./components/EventCardGroups";
import Filters from "./components/Filters";

/**
   * <EventCard
          date={"Thu, Oct 23, 2025"}
          time={"2PM - 4PM"}
          location={"Private Location (register to display)"}
          category={["Workshop"]}
          title={"Convention Badge Workshop"}
          organizer={"Furry @ York"}
          organizerID={1}
          banner={""}
        />
   */

const page = async () => {
  const initialGroups = await getEventCardGroups(0, 10);

  // Replace totalItems with some api call for total number of upcoming/past events
  return (
    <div className="flex flex-col gap-5 min-h-screen bg-gray-100">
      <Header />
      <div className="min-w-fit mx-48">
        <Filters />
        <EventCardList
          initialGroups={initialGroups}
          initialPage={0}
          limit={10}
          totalItems={100}
        />
      </div>
    </div>
  );
};

export default page;
