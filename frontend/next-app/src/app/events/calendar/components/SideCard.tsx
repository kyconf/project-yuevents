import React from "react";
import Image from "next/image";
import { EventInformation, formatDateRange } from "../page";
import { MdAccessTimeFilled } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";

interface Prop {
  event: EventInformation;
}

/**
 *
 * @param {EventInformation} event - An event
 * @returns An event card to be displayed in the side panel
 */
const SideCard = ({ event }: Prop) => {
  const start_at = new Date(event.start_at);
  const end_at = new Date(event.end_at);

  return (
    <div className="flex flex-col flex-fill wrap-anywhere bg-white border z-10 p-3">
      <div className="text-[16px] text-wrap font-bold mb-2">
        {event.title} - {event.club_name}
      </div>
      <Image
        src={event.banner}
        alt=""
        width={640}
        height={320}
        className="w-full h-auto shadow-2xs"
      />
      <div className="grid grid-cols-1 gap-4 py-2">
        <p>{event.description}</p>
        <div className="flex gap-1">
          <MdAccessTimeFilled />
          <div className="flex-1">
            <p className="text-sm">{formatDateRange(start_at, end_at)}</p>
          </div>
          <ImLocation2 />
          <div className="flex-1">
            <p className="text-sm">{event.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCard;
