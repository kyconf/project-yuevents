import React from "react";
import Image from "next/image";
import { User } from "../page";

interface Prop {
  execData: User | null;
}

const Executives = ({ execData }: Prop) => {
  console.log(execData);
  console.log(execData?.avatar_url);
  return (
    <div className="flex flex-col bg-white py-8 gap-8">
      <div className="flex justify-center">
        <span className="text-4xl font-thin">Our Executives</span>
      </div>
      {execData ? (
        <div className="flex flex-row justify-center gap-6">
          <Image
            src={execData.avatar_url}
            alt=""
            width={100}
            height={100}
            className="rounded-[50%]"
          ></Image>
          <span className="flex items-center text-2xl font-normal">
            {execData.full_name}
          </span>
        </div>
      ) : (
        <div className="flex justify-center">No Executives Found</div>
      )}
    </div>
  );
};

export default Executives;
