import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import {
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaSpotify,
} from "react-icons/fa";
interface Prop {
  email: string;
  website: string;
  socials: Socials;
}

interface Socials {
  [social: string]: string | {};
}

const Contact = ({ email, website, socials }: Prop) => {
  return (
    <div className="flex flex-col bg-blue-400 py-8 gap-8">
      <div className="flex justify-center">
        <span className="text-4xl text-white font-thin">Contact & Socials</span>
      </div>
      <div className="flex flex-row justify-center gap-4">
        {typeof socials["facebook"] === "string" && (
          <a href={socials["facebook"]}>
            <FaFacebook size={50} className="cursor-pointer" />
          </a>
        )}
        {typeof socials["instagram"] === "string" && (
          <a href={socials["instagram"]}>
            <FaInstagram size={50} className="cursor-pointer" />
          </a>
        )}
        {typeof socials["discord"] === "string" && (
          <a href={socials["discord"]}>
            <FaDiscord size={50} className="cursor-pointer" />
          </a>
        )}
        {typeof socials["github"] === "string" && (
          <a href={socials["github"]}>
            <FaGithub size={50} className="cursor-pointer" />
          </a>
        )}
        {typeof socials["youtube"] === "string" && (
          <a href={socials["youtube"]}>
            <FaYoutube size={50} className="cursor-pointer" />
          </a>
        )}
        {typeof socials["twitter"] === "string" && (
          <a href={socials["twitter"]}>
            <FaSquareXTwitter size={50} className="cursor-pointer" />
          </a>
        )}
        {typeof socials["X"] === "string" && (
          <a href={socials["X"]}>
            <FaSquareXTwitter size={50} className="cursor-pointer" />
          </a>
        )}
        {typeof socials["linkedin"] === "string" && (
          <a href={socials["linkedin"]}>
            <FaLinkedin size={50} className="cursor-pointer" />
          </a>
        )}
        {typeof socials["spotify"] === "string" && (
          <a href={socials["spotify"]}>
            <FaSpotify size={50} className="cursor-pointer" />
          </a>
        )}
      </div>
      <div className="flex flex-row justify-center gap-10">
        <span className="text-xl text-white font-thin">{`Email: ${email}`}</span>
        <span className="text-xl text-white font-thin">
          Website: <a href={website}>{website}</a>
        </span>
      </div>
    </div>
  );
};

export default Contact;
