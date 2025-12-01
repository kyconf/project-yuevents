"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";


interface Event {
  id: string,
  title: string,
  description: string,
  location: string,
  start_at: string,
  end_at: string,
  rsvp_deadline: string,
  capacity: number,
  is_public: boolean,
  slug?: string,
  created_at: string,
  updated_at: string,
  banner: string,
  club_id: string,

}
async function fetchEvents(limit: number = 5, offset: number = 0): Promise<Event[][]> {
  const res = await fetch(`http://localhost:8000/events?limit=${limit}&offset=${offset}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }
  const data: Event[][] = await res.json();
  console.log(data)
  return data;
}
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
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadEvents() {
    try {
      setLoading(true);     
      const data: Event[] = await fetchEvents(5, 0); 
      console.log("Fetched events:", data);
      const sortedEvents = data
        .sort((a: Event, b: Event) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 5);

      setEvents(sortedEvents);
   
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  loadEvents();
}, []);

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
  const sliderFor = useRef<typeof Slider>(null);
  const sliderNav = useRef<typeof Slider>(null);
  const textRef = useRef<HTMLDivElement>(null);


  const featureRef = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

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
  //while the useEffect still running, display loading 
    if (loading) {
    return (
      <div className="mt-20 flex items-center justify-center">
        <p className="text-blue-200 text-xl">Loading featured events...</p>
      </div>
    );
  }

    if (events.length === 0) {
    return (
      <div className="mt-20 flex items-center justify-center">
        <p className="text-blue-200 text-xl">No events available</p>
      </div>
    );
  }

  return (
    <div className="mt-20" id="feature-section">
      <motion.div
        ref={textRef}
        animate="visible"
        variants={textVariant}
      >
        <h1 className="mt-10 flex items-center justify-center text-3xl sm:text-3xl md:text-5xl font-mono font-bold text-blue-200 leading-tight ">
          Featured News
        </h1>
      </motion.div>
      <motion.div
        ref={featureRef[0]}
        animate="Visible"
        variants={featureVariant}
        custom={1}
        className="w-11/12 md:w-3/4 mx-auto mt-25 "
      >
        <Slider ref={sliderFor} {...settings_Feartured}>
          {events.flat(Infinity).map((event) => (
            <div key={event.id} className="w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full ">
                <div className="md:w-1/2 flex-shrink-0">
                  <Image
                    src={event.banner}
                    alt={event.title}
                    width={700}
                    height={400}
                    className="w-full h-auto rounded-lg object-cover ml-10"
                  />
                </div>

                <div className="md:w-1/3 flex flex-col justify-center ml-10">
                  <p className="text-3xl font-mono font-bold mb-10 text-blue-200">
                    {event.title}
                  </p>
                  <p className="text-blue-200 mb-10">{event.description}</p>
                  <Link
                    href={"/events/event-feed/" + event.id}
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
        animate="visible"
        variants={featureVariant}
        custom={2}
        className="mt-20"
      >
        <Slider ref={sliderNav} {...settings}>
          {events.flat(Infinity).map((event) => (
            <div key={event.id} className="w-full">
              <div className="flex flex-col items-center">
                <div className=" flex-shrink-0">
                  <Image
                    src={event.banner}
                    alt={event.title}
                    width={250}
                    height={400}
                    className=" h-auto rounded-lg object-cover "
                  />

                  <div className="max-w-70">
                    <p className="font-bold font-mono text-blue-200 mt-5">
                      {event.title}
                    </p>
                    <p className="text-blue-200">
                      {event.description}
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