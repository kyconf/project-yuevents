import Image from "next/image";
import P1 from "../assets/P1.webp";
import P5 from "../assets/P5.jpg";
import P3 from "../assets/P3.jpg";
import P4 from "../assets/P4.webp";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type HeroSectionProps = {
  onExploreNowClick: () => void;
  onAboutUsClick: () => void;
};

function Hero_Section({ onExploreNowClick, onAboutUsClick }: HeroSectionProps) {
  // Text variants (fade + slide)
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  // Image variants (fade + scale)
  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i = 1) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  // Refs + hooks
  const textRef = useRef<HTMLDivElement>(null); //imagine like creating pointer that help to point to specific div that we want
  const isTextInView = useInView(textRef, { amount: 0.3 }); //if the pointer of textRef is inViewPoint, set isTextInView == true

  const imageRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]; //create a list of pointer according to the number of pics
  const imagesInView = imageRefs.map((ref) => useInView(ref, { amount: 0.3 }));

  const imageData = [
    { src: P1, alt: "Deco 1" },
    { src: P5, alt: "Deco 2" },
    { src: P3, alt: "Deco 3" },
    { src: P4, alt: "Deco 4" },
  ];

  return (
    <>
      <section className="pt-20 relative flex items-center justify-center h-screen overflow-hidden px-6">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Text Section */}
          <motion.div
            ref={textRef}
            className="flex-1 text-center md:text-left"
            animate={isTextInView ? "visible" : "hidden"}
            variants={textVariant}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-200 leading-tight mb-5"
              variants={textVariant}
              custom={1}
            >
              Join campus life — Discover what is happening around you!
            </motion.h1>

            <motion.p
              className="font-extrabold text-blue-200 leading-tight"
              variants={textVariant}
              custom={2}
            >
              Explore new events, activities and connect with many communities
              and clubs that share the same hobby with you
            </motion.p>

            <div className="mt-6 flex justify-center md:justify-start gap-5">
              <motion.button
                onClick={onExploreNowClick}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-900 transition cursor-pointer"
                variants={textVariant}
                custom={3}
              >
                Explore Now
              </motion.button>

              <motion.button
                onClick={onAboutUsClick}
                className="px-6 py-3 bg-white text-blue-600 rounded-xl transition cursor-pointer"
                variants={textVariant}
                custom={3}
              >
                About Us
              </motion.button>
            </div>
          </motion.div>

          {/* Image Grid */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 md:gap-6">
            {imageData.map((img, i) => (
              <motion.div
                key={i}
                ref={imageRefs[i]}
                className={`relative w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-lg ${
                  i === 1 ? "translate-y-6" : i === 3 ? "translate-y-6" : ""
                }`}
                animate={imagesInView[i] ? "visible" : "hidden"}
                variants={imageVariant}
                custom={i}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="w-250 mx-auto"></hr>
    </>
  );
}

export default Hero_Section;
