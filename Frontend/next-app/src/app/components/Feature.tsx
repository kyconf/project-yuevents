"use client";

import Image from "next/image";
import Feature from "../assets/Feature1.jpg";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-200 text-black  p-2 cursor-pointer z-10"
      onClick={onClick}
    >
      &gt;
    </div>
  );
}

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-200 text-black  p-2 cursor-pointer z-10"
      onClick={onClick}
    >
      &lt;
    </div>
  );
}
export default function FeaturedCarousel() {
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const featureVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };
  const sliderFor = useRef<Slider>(null);
  const sliderNav = useRef<Slider>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, { amount: 0.3 });

  const featureRef = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const isFeatureInView = featureRef.map((ref) =>
    useInView(ref, { amount: 0.1 })
  );
  const settings_Feartured = {
    asNavFor: sliderNav.current,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const settings = {
    asNavFor: sliderFor.current,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const data = [
    {
      id: 1,
      name: "Furry Day",
      img: Feature,
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 2,
      name: `Furry Day`,
      img: Feature,
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 3,
      name: `Furry Day`,
      img: Feature,
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 3,
      name: `Furry Day`,
      img: Feature,
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
    {
      id: 3,
      name: `Furry Day`,
      img: Feature,
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    },
  ];

  return (
    <div className="" id="feature-section">
      <motion.div
        ref={textRef}
        animate={isTextInView ? "visible" : "hidden"}
        variants={textVariant}
      >
        <h1 className="mt-10 flex items-center justify-center text-3xl sm:text-3xl md:text-5xl font-mono font-bold text-blue-200 leading-tight ">
          Featured News
        </h1>
      </motion.div>
      <motion.div
        ref={featureRef[0]}
        animate={isFeatureInView[0] ? "visible" : "hidden"}
        variants={featureVariant}
        custom={1}
        className="w-11/12 md:w-3/4 mx-auto mt-10"
      >
        <Slider ref={sliderFor} {...settings_Feartured}>
          {data.map((d) => (
            <div key={d.id} className="w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full ">
                <div className="md:w-1/2 flex-shrink-0">
                  <Image
                    src={d.img}
                    alt={d.name}
                    width={700}
                    height={400}
                    className="w-full h-auto rounded-lg object-cover ml-10"
                  />
                </div>

                <div className="md:w-1/3 flex flex-col justify-center ml-10">
                  <p className="text-3xl font-mono font-bold mb-10 text-blue-200">
                    {d.name}
                  </p>
                  <p className="text-blue-200 mb-10">{d.review}</p>
                  <Link
                    href="#"
                    className="cursor-pointer bg-blue-200 w-30 p-3 rounded-lg flex justify-center font-mono font-bold "
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>

      <motion.div
        ref={featureRef[1]}
        animate={isFeatureInView[1] ? "visible" : "hidden"}
        variants={featureVariant}
        custom={2}
        className="mt-10"
      >
        <Slider ref={sliderNav} {...settings}>
          {data.map((d) => (
            <div key={d.id} className="w-full">
              <div className="flex flex-col items-center">
                <div className=" flex-shrink-0">
                  <Image
                    src={d.img}
                    alt={d.name}
                    width={250}
                    height={400}
                    className=" h-auto rounded-lg object-cover "
                  />

                  <div className="max-w-70">
                    <p className="font-bold font-mono text-blue-200 mt-5">
                      {d.name}
                    </p>
                    <p className="text-blue-200">
                      This is a description of the events, can be taken from the
                      database later
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>
    </div>
  );
}
