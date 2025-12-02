"use client"
import Header from "@/app/components/Header";
import EventHeaderProp from "./components/EventHeaderProps";
import EventInfo from "./components/EventInfo"
import EventBanner from "./components/EventBanner"
import RegisterButton from "./components/RegisterButton";
import EventDescription from "./components/EventDescription";
import EventRating from "./components/EventRate";
import EventComment from "./components/EventComments";
import ReviewSubmitButton from "./components/EventReviewSubmitButton";
import { useState, useEffect, use } from "react";
import CommentCard from "./components/CommentCard";
import {useAuth} from "@/app/events/event-feed/[eventID]/components/userAuth"
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

async function fetchEvent(id: string): Promise<Event> {
  const res = await fetch(`http://localhost:8000/events/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch event: ${res.status}`);
  return res.json();
}

export function formatDateTime(isoString: string) {
  const date = new Date(isoString);
  return {
    date: date.toLocaleDateString('en-CA', {
      timeZone: 'America/Toronto',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    time: date.toLocaleTimeString('en-CA', {
      timeZone: 'America/Toronto',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
}

export default function Page({ params }: { params: Promise<{ eventID: string }> }) {
    const unwrapParams = use(params);
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [field, setField] = useState<{ rate: number, comment: string }>({ rate: 0, comment: "" })
    // const fetchUser = async () => {
    //     const { data: sessionData } = await supabase.auth.getSession();
    //     const session = sessionData?.session;

    //     if (!session) return setUser(null);
    //     const { data, error } = await supabase.auth.getUser();
    //     if (error) return setUser(null);
    //     setUser(data.user);
    //     setToken(session.access_token);
    // };

    // useEffect(() => { fetchUser() }, []);
    
    const {isLoggedIn, user, token} = useAuth();


    const handleChange = (key: string, value: unknown) => setField((prev) => ({ ...prev, [key]: value }))

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if(!isLoggedIn){
        alert("You must signed in to write review");
        return;
      }
      e.preventDefault();
      console.log("TOKEN:", token);
      console.log(user);
      try{
        const submission = await fetch("http://localhost:8000/reviews", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            comment: field.comment,
            rating: field.rate,
            events_id: unwrapParams.eventID
          })
        }
      );
      if(!submission.ok){
         throw new Error(`Failed to upload comment: ${submission.status}`); 
        }
      } catch(err){
      console.log("Error:" + err)
    } finally {
      alert("Comment posted successfully")
      window.location.reload();
    }
  }

    useEffect(() => {
      async function fetchData() {
        try {
          const event = await fetchEvent(unwrapParams.eventID);
          setEvent(event);
        } catch (error) {
          console.error("Error fetching event:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, [unwrapParams.eventID]);

    if (loading || !event) return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="relative">
          <div className="w-20 h-20 border-t-4 border-b-4 border-cyan-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-t-4 border-b-4 border-pink-400 rounded-full animate-spin animation-delay-500"></div>
        </div>
      </div>
    );

    const startDateTime = formatDateTime(event.start_at);
    const endDateTime = formatDateTime(event.end_at);
    
    

    return (
      <div className=" bg-gradient-to-br from-black to-blue-800">
        <Header />

        {/* HERO SECTION - Full Width Banner with Info Card Overlay */}
        <div className="relative pt-8">
          {/* Banner Component */}
          <EventBanner banner={event.banner} title={event.title} />

          {/* Overlay Content - Info Card right side */}
          <div className="absolute inset-0 flex items-center transform scale-85">
            <div className="max-w-7xl mx-auto px-6 w-full mt-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
                
                {/* Left side - Empty space */}
                <div className="hidden lg:block"></div>

                {/* Right side - Info Card */}
                <div className="lg:ml-auto w-full max-w-100">
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl blur-xl opacity-75"></div>
                    
                    {/* Main card with glass morphism effect */}
                    <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/70 flex flex-col justify-center transform transition-all duration-300 hover:shadow-2xl">
                      {/* Event Header */}
                      <EventHeaderProp title={event.title} organizer="Event Organizer" />

                      {/* Event Info */}
                      <EventInfo
                        start_date={startDateTime.date}
                        start_time={startDateTime.time}
                        end_date={endDateTime.date}
                        end_time={endDateTime.time}
                        location={event.location}
                      />

                      {/* Register Button */}
                      <div className="mt-6">
                        <RegisterButton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description + Ratings & Comments */} 
        <div className="flex flex-col lg:flex-row gap-8 mt-20 mx-4 lg:mx-20 transform scale-90 justify-center "> 
            {/* Description */} 
            <div className="flex-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl border border-white/50"> 
              <EventDescription 
                 description={event.description} 
                 rsvp_deadline={formatDateTime(event.rsvp_deadline).date} 
                 capacity={event.capacity} is_public={event.is_public} 
                 slug={event.slug ?? ""} created_at={formatDateTime(event.created_at).date} 
                 updated_at={formatDateTime(event.updated_at).date} 
              /> 
            </div> 
            
            {/* Ratings & Reviews */} 
            <div className="flex-1 bg-white backdrop-blur-sm rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl border border-white/50"> 
              <div className="sticky top-0 backdrop-blur-sm z-10 pb-6 -mt-2 -mx-8 px-8 pt-6 border-b border-gray-100"> 
                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent">Ratings & Reviews</h2> 
                <EventRating 
                rate={field.rate} 
                onChange={handleChange} /> 
                <EventComment 
                comment={field.comment} 
                onChange={handleChange} /> 
                <ReviewSubmitButton 
                onClick={handleSubmit} /> 
                </div> 
                {/* Comment list */} 
                <div className="flex flex-col gap-6 mt-6 max-h-[300px] overflow-y-auto pr-2"> 
                  <CommentCard params={{eventID: event.id}}/> 
                </div> 
              </div> 
            </div>
      </div>
    );
}