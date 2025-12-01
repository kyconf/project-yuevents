import React from "react";
import { LuUserRoundPen } from "react-icons/lu";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";

interface Prop {
  description: string;
  numOfEvents: number;
}

const Description = ({ description, numOfEvents }: Prop) => {
  return (
    <div className="flex flex-col bg-white gap-5 py-8">
      <div className="flex justify-center">
        <span className="text-4xl font-thin">About Us</span>
      </div>
      <div className="flex justify-center">
        <span className="text-xl font-thin">{description}</span>
      </div>
      <div className="flex flex-row justify-center pt-10 gap-30">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <LuUserRoundPen size="60px" color="blue" />
          </div>
          <span className="flex justify-center text-3xl font-bold text-[#8c11de]">
            1
          </span>
          <span className="flex justify-center text-xl">Executives</span>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <LuUsersRound size="60px" color="blue" />
          </div>
          <span className="flex justify-center text-3xl font-bold text-[#8c11de]">
            0
          </span>
          <span className="flex justify-center text-xl">Followers</span>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <MdOutlineCalendarToday size="60px" color="blue" />
          </div>
          <span className="flex justify-center text-3xl font-bold text-[#8c11de]">
            {numOfEvents}
          </span>
          <span className="flex justify-center text-xl">Events</span>
        </div>
      </div>
    </div>
  );
};

export default Description;
