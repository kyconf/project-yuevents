import Header from "@/app/components/Header";
import EventHeaderProp from "./components/EventHeaderProps";
import EventInfo from "./components/EventInfo"
import EventBanner from "./components/EventBanner"
import RegisterButton from "./components/RegisterButton";
import EventDescription from "./components/EventDescription";

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
  const res = await fetch(`http://localhost:8000/events/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch event: ${res.status}`);
  }
  const data = await res.json();
  console.log(data)
  return data;
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
    
    const event = await fetchEvent(params.eventID);
    const startDateTime = formatDateTime(event.start_at);
    const endDateTime = formatDateTime(event.end_at);
    console.log(event.banner)
    
    return (
      <div className="bg-white">
        <Header />
        <div className="flex flex-col">
          <div className="flex justify-center mt-30">
            <EventBanner 
              banner={event.banner}
              title={event.title}
            />
            <div className="flex flex-col">
              <EventHeaderProp 
                title={event.title} 
                organizer="Event Organizer"
              />
              <EventInfo 
                start_date={startDateTime.date} 
                start_time={startDateTime.time} 
                end_date={endDateTime.date}
                end_time={endDateTime.time}
                location={event.location}
              />
              <RegisterButton />
            </div>
          </div>
          <div className="flex items-center justify-center mb-20">
            <EventDescription 
            description={event.description} 
            rsvp_deadline={formatDateTime(event.rsvp_deadline).date}
            capacity={event.capacity}
            is_public={event.is_public}
            slug={event.slug ?? ""}
            created_at={formatDateTime(event.created_at).date}
            updated_at={formatDateTime(event.updated_at).date}/>
          </div>
        </div>
      </div>
    );
}
