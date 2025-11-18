import React, { useEffect, useRef, useState } from "react";
import { EventInformation } from "../page";
import HoverCard from "./HoverCard";

interface Prop {
  event: EventInformation;
}

/**
 *
 * @param {EventInformation} event - An event
 * @returns A text box containing the titlt eof the event, hover over the box to display a corresponding hover card
 */
const EventLine = ({ event }: Prop) => {
  const [isHovering, setIsHovering] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  const [showLeft, setShowLeft] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovering && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const spaceLeft = window.innerWidth - rect.left;
      const spaceRight = rect.right;

      // Show above if there is more space above
      setShowAbove(spaceAbove > spaceBelow);
      setShowLeft(spaceLeft > spaceRight);
    }
  }, [isHovering]);

  return (
    <div
      ref={elementRef}
      className="relative whitespace-nowrap text-ellipsis text-xs font-bold pl-0.5"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {event.title}
      {isHovering && (
        <div
          className={`absolute z-50 ${showLeft ? "left-full" : "right-full"} ${
            showAbove ? "bottom-0 mb-1" : "top-0 mt-1"
          }`}
        >
          <HoverCard event={event} />
        </div>
      )}
    </div>
  );
};

export default EventLine;
