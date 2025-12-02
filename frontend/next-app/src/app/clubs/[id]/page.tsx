"use client";
import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Header from "@/app/components/Header";
import Description from "./components/Description";
import { EventInformation } from "@/app/events/event-feed/components/EventCard";
import UpcomingEvents from "./components/UpcomingEvents";
import Executives from "./components/Executives";
import Contact from "./components/Contact";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Club {
  owner_id: string;
  name: string;
  slug: string;
  about: string;
  avatar_url: string;
  banner_url: string;
  is_public: boolean;
  join_policy: string;
  contact_email: string;
  website: string;
  socials: {
    additionalProp1: {} | string;
  };
  id: string;
}

export interface User {
  id: string;
  full_name: string;
  avatar_url: string;
}

const Page = () => {
  const numOfEventsToFetch = 5;
  const [clubID, setClubID] = useState("");
  const [data, setData] = useState<Club | null>(null);
  const [clubEvents, setClubEvents] = useState<EventInformation[][] | null>(
    null
  );
  const [numOfEvents, setNumOfEvents] = useState<number>(0);
  const [execData, setExecData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Extract club ID from URL path
    const path = window.location.pathname;
    const id = path.split("/").pop();
    if (id) setClubID(id);
  }, []);

  useEffect(() => {
    // Fetch data when clubID changes
    if (!clubID) return;

    const fetchClubData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/clubs/${clubID}`);
        const result = await response.json();

        if (!response.ok) {
          setError(true);
        } else {
          setData(result);
          setError(false);
        }
      } catch (err) {
        setError(true);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchClubEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/events?limit=${numOfEventsToFetch}&club_id=${clubID}`
        );
        const result = await response.json();

        if (!response.ok) {
          setError(true);
        } else {
          setClubEvents(result);
          setError(false);
        }
      } catch (err) {
        setError(true);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchNumOfEvents = async () => {
      let ctr = 0;
      let offset = 0;
      const limit = 100;
      let result: EventInformation[][] | null = null;

      do {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/events?offset=${offset}&limit=${limit}&club_id=${clubID}`
          );
          result = await response.json();

          if (!response.ok || !result) {
            break;
          }
          ctr += result.reduce((accumulator, currentArray) => {
            return accumulator + currentArray.length;
          }, 0);
          offset += limit;
        } catch (err) {
          console.error("Error fetching events count:", err);
          break;
        }
      } while (result && result.length > 0);

      setNumOfEvents(ctr);
    };

    fetchClubData();
    fetchClubEvents();
    fetchNumOfEvents();
  }, [clubID]);

  useEffect(() => {
    // fetch executive data when club data has been fetched
    if (data == null) {
      return;
    }

    const getUserData = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/users/${data.owner_id}`
      );
      setExecData(await response.json());
      console.log(execData);
      console.log(data?.owner_id);
    };

    getUserData();
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center h-screen w-screen">
        <AiOutlineLoading3Quarters className="animate-spin rounded-full h-20 w-20 border-b-2 border-white" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-row justify-center items-center h-screen w-screen text-red-600">
        Invalid ID
      </div>
    );
  }

  return (
    <>
      <Header />
      <Banner name={data.name} src={data.banner_url} />
      <Description description={data.about} numOfEvents={numOfEvents} />
      <UpcomingEvents groupID={clubID} eventGroups={clubEvents} />
      <Executives execData={execData} />
      <Contact
        email={data.contact_email}
        website={data.website}
        socials={data.socials}
      />
    </>
  );
};

export default Page;
