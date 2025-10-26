import Header from "@/app/components/Header";
import React from "react";
import EventCard, { EventInformation } from "./components/EventCard";
import Filters from "./components/Filters";

const page = () => {
  // Replace with some api call
  const events: EventInformation[] = [
    {
      title: "a",
      time: "a",
      location: "a",
      date: "a",
      category: ["a"],
      organizer: "a",
      organizerID: 1,
      banner: "a",
    },
  ];

  return (
    <>
      <Header />
      <div className="my-5">
        <Filters />
      </div>
      <EventCard
        date={"Thu, Oct 23, 2025"}
        time={"2PM - 4PM"}
        location={"Private Location (register to display)"}
        category={["Workshop"]}
        title={"Convention Badge Workshop"}
        organizer={"Furry @ York"}
        organizerID={1}
        banner={""}
      />
      <div></div>
    </>
  );
};

export default page;
