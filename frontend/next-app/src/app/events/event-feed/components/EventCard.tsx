import Image from "next/image";
import { MdAccessTimeFilled } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import Link from "next/link";

// Actual props and types tbd
export interface EventInformation {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  location: string;
  banner: string;
  club: Club;
  category?: string[];
}

interface Club {
  id: string;
  name: string;
}

/**
 * @param {number} id - The id of the event
 * @param {string} title - The title of the event
 * @param {string} start_at - The start time of the event
 * @param {string} end_at - The end time of the event
 * @param {string} location - The location of the event
 * @param {string} banner - The api endpoint for the provided banner image for this event
 * @param {string} club.id - The id of the organizer
 * @param {string} club.name - The name of the organizer
 * @param {string[]} category - The categories that the event fall under
 *
 * // To be added
 * @param {string} club[name] - The name of the organizer
 *
 * @returns The event card component
 */

const EventCard = ({
  id,
  title,
  start_at,
  end_at,
  location,
  club,
  banner,
  category,
}: EventInformation) => {
  const startDate = new Date(Date.parse(start_at));
  const endDate = new Date(Date.parse(end_at));

  /**
   *
   * @param {string} startDate - Some start time
   * @param {string} startDate Some end time
   * @returns Start time to end time
   */
  function formatDateRange(startDate: Date, endDate: Date) {
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

  return (
    <div className="flex flex-col xl:flex-row gap-6 bg-white border border-gray-300">
      <Link
        className="flex relative justify-center xl:flex-none m-1 max-w-640 xl:max-w-50 max-h-320 xl:max-h-25"
        href={"/events/event-feed/" + id}
      >
        <Image
          src={banner}
          alt=""
          width={640}
          height={320}
          style={{ maxWidth: "100%", height: "100%" }}
        />
      </Link>
      <div className="flex flex-col flex-1 gap-2 p-2">
        <Link
          className="text-sky-800 text-xl w-fit"
          href={"/events/event-feed/" + id}
        >
          {title}
        </Link>
        <div className="flex gap-1">
          <MdAccessTimeFilled />
          <div className="flex-1">
            <p className="text-sm">{startDate.toDateString()}</p>
            <p className="text-sm">{formatDateRange(startDate, endDate)}</p>
          </div>
          <ImLocation2 />
          <div className="flex-1">
            <p className="text-sm">{location}</p>
          </div>
        </div>
        {category && (
          <div className="flex">
            <span className="rounded-sm bg-gray-500 px-2 py-0.5 text-white">
              {/* events currently don't have any categories */}
              {/* <p className="text-sm">{category}</p> */}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-end m-2 gap-2">
        <button className="rounded-md bg-green-700 text-white px-2 py-2 w-20">
          Register
        </button>

        <Link
          className="text-right text-sm text-gray-600"
          href={"/clubs/" + club.id}
        >
          {club.name}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
