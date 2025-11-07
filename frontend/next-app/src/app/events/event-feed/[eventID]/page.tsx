import Header from "@/app/components/Header";
import EventHeaderProp from "./components/EventHeaderProps";
import EventInfo from "./components/EventInfo"
import EventBanner from "./components/EventBanner"
import RegisterButton from "./components/RegisterButton";
import EventDescription from "./components/EventDescription";

interface Event {
  creator_id: string,
  title: string,
  description: string,
  location: string,
  start_at: string,
  end_at: string,
  rsvp_deadline: string,
  capacity: number,
  is_public: boolean,
  slug: string,
  id: string,
  created_at: string,
  updated_at: string,
  category?: string[]  // category là array
}

async function fetchEvent(id: string): Promise<Event> {
  const res = await fetch(`http://localhost:8000/events/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch event: ${res.status}`);
  }
  
  return res.json();
}

function formatDateTime(isoString: string) {
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

export default async function Page({params}: {params: {eventID: string}}) {
    console.log("Fetching event with id:", params.eventID);
    const event = await fetchEvent(params.eventID);
    const startDateTime = formatDateTime(event.start_at);

    
    return (
      <div className="bg-white h-screen">
        <Header />
        <div className="flex flex-col">
          <div className="flex justify-center mt-20">
            <EventBanner 
              banner="frontend\next-app\src\app\events\event-feed\temp_assets\FurryBanner.png" 
              title={event.title}
            />
            <div className="flex flex-col">
              <EventHeaderProp 
                title={event.title} 
                organizer="Event Organizer"
              />
              <EventInfo 
                date={startDateTime.date} 
                time={startDateTime.time} 
                location={event.location}
              />
              <RegisterButton />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <EventDescription description={event.description} />
          </div>
        </div>
      </div>
    );
}