
import Header from "@/app/components/Header";
import {EventInformation} from "@/app/events/event-feed/components/EventCard";
import EventHeaderProp from "./components/EventHeaderProps";
import EventInfo from "./components/EventInfo"
import EventBanner from "./components/EventBanner"
import RegisterButton from "./components/RegisterButton";
import EventDescription from "./components/EventDescription";
interface PageProps {
  params: { eventID: string };
}
 export async function fetchEventByID(eventID: number){
    try{
        //URL backend
        const res = await fetch(`https://localhost:8000/events/${eventID}`); //Assume the backend URL

        if(!res.ok) {
            throw new Error(`Failed to load event: ${res.status}`)
        }
        const data = await res.json();
        return data;
    } catch(err){
        console.error(err);
        throw err;
    }
}

export default async function Page({params} : {params: {eventID: string}}){
      const eventID = parseInt(params.eventID, 10);
  const event = await fetchEventByID(eventID);
    return (<div className="bg-white h-screen">
    <Header></Header>
    <div className="flex flex-col">
    <div className="flex justify-center mt-20 ">
        <EventBanner banner={event.banner} title={event.title}></EventBanner>
        <div className="flex flex-col ">
        <EventHeaderProp title={event.title} category={event.category} organizer={event.organizer}></EventHeaderProp>
        <EventInfo date={event.date} time={event.time} location={event.location}></EventInfo>
        <RegisterButton></RegisterButton>
        </div>
    </div>
        <div className="flex items-center justify-center ">
         <EventDescription description={event.description}></EventDescription>
         </div>
    </div>
    </div>);
}