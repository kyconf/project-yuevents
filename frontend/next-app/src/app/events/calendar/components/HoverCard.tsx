import React from "react";
import Image from "next/image";
import { EventInformation, formatDateRange } from "../page";

interface Prop {
  event: EventInformation;
}

/**
 *
 * @param {EventInformation} event - An event
 * @returns Hover card that appears when hovering over an event line in a calendar cell
 */
const HoverCard = ({ event }: Prop) => {
  const start_at = new Date(event.start_at);
  const end_at = new Date(event.end_at);
  return (
    <div className="wrap-break-word bg-white border rounded-3xl z-20 w-[225px] p-3 shadow-lg">
      <div className="text-[16px] text-wrap font-bold mb-2">{event.title}</div>
      <Image
        src={event.banner}
        alt=""
        width={640}
        height={320}
        className="w-full h-auto"
      />
      <div className="text-[12px] text-wrap font-semibold py-2">
        <p>{event.location}</p>
        <p>{formatDateRange(start_at, end_at)}</p>
      </div>
    </div>
  );
};

export default HoverCard;
