import React from "react";
import Image from "next/image";

interface Prop {
  name: string;
  src: string;
}

const Banner = ({ name, src }: Prop) => {
  return (
    <div className="relative w-screen h-screen">
      <Image fill src={src} alt="" />
      {/** Dark overlay for banner image */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="absolute inset-0 flex items-center justify-center z-10 -translate-y-20">
        <div className="flex flex-col items-center gap-10">
          <span className="text-white text-4xl font-bold">{name}</span>
          <button className="bg-blue-800  hover:bg-blue-700 text-gray-100 font-semibold px-6 py-3 rounded-md">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
