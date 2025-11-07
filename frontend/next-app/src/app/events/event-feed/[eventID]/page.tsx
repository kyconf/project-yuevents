
import Header from "@/app/components/Header";
import {EventInformation} from "@/app/events/event-feed/components/EventCard";
import EventHeaderProp from "./components/EventHeaderProps";
import EventInfo from "./components/EventInfo"
import EventBanner from "./components/EventBanner"
import RegisterButton from "./components/RegisterButton";
import EventDescription from "./components/EventDescription";
/* export async function fetchEventByID(eventID: number){
    try{
        //URL backend
        const res = await fetch(`https://localhost:8000/events/${eventID}`); //Assume the backend URL

        if(!res.ok) {
            throw new Error(`Failed to load event: ${res.status}`)
        }
        const data = await res.json;
        return data;
    } catch(err){
        console.error(err);
        throw err;
    }
}
*/ //This is for future use, when we connect frontend and backend
//Right now we will just use dummy data

 const dummyData: EventInformation = {
        title: "Convention Badge Workshop",
        time: "2PM - 4PM",
        location: "Private Location (register to display)",
        date: "Thu, Oct 23, 2025",
        category: ["Workshop", "Ethic", "Sports"],
        organizer: "Furry @ York",
        organizerID: 1,
        eventID: 1,
        banner: "@/app/events/event-feed/temp_assets/FurryBanner.png",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
      };

export default function Page(){
    const event = dummyData;
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