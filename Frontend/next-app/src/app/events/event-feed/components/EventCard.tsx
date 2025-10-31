import Image from "next/image";
import FurryBanner from "./FurryBanner.png";
import { MdAccessTimeFilled } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import Link from "next/link";

// Actual props and types tbd
export interface EventInformation {
  date: string;
  time: string;
  location: string;
  category: string[];
  title: string;
  organizer: string;
  organizerID: number;
  eventID: number;
  banner: string; // Assuming that what is passed is a url
}

const EventCard = ({
  date,
  time,
  location,
  category,
  title,
  organizer,
  organizerID,
  eventID,
}: EventInformation) => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 bg-white border-1 border-gray-300">
      <Link
        className="flex relative justify-center xl:flex-none m-1 max-w-640 xl:max-w-50 max-h-320 xl:max-h-25"
        href={"/events/event/" + eventID}
      >
        <Image
          // Need to replace this with remote image instead of static
          src={FurryBanner}
          alt=""
          style={{ maxWidth: "100%", height: "100%" }}
        />
      </Link>
      <div className="flex flex-col flex-1 gap-2 p-2">
        <Link
          className="text-sky-800 text-xl w-fit"
          href={"/events/event/" + eventID}
        >
          {title}
        </Link>
        <div className="flex gap-1">
          <MdAccessTimeFilled />
          <div className="flex-1">
            <p className="text-sm">{date}</p>
            <p className="text-sm">{time}</p>
          </div>
          <ImLocation2 />
          <div className="flex-1">
            <p className="text-sm">{location}</p>
          </div>
        </div>
        <div className="flex">
          <span className="rounded-sm bg-gray-500 px-2 py-0.5 text-white">
            <p className="text-sm">{category}</p>
          </span>
        </div>
      </div>
      <div className="flex flex-col m-2 gap-2">
        <button className="rounded-md bg-green-700 text-white px-4 py-2">
          Register
        </button>
        <Link className="text-sm text-gray-600" href={"/clubs/" + organizerID}>
          {organizer}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
