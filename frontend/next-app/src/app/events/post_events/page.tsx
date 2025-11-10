'use client'
import PostEventHeader from "./components/postEventHeader";
import EventBasicInfo from "./components/postEventBasicInfo";
import DateAndTime from "./components/postEventDateAndTime";
import EventSettings from "./components/postEventSettings";
import EventBanner from "./components/postEventBanner";
import SubmitButton from "./components/postSubmitButton";
import Category from "./components/postEventCategory";
import {useState} from "react";
type Option = { value: string; label: string };
interface Field {
    title: string;
    description: string;
    location: string;
    category: Option[];
    date: string;
    time: string;
    banner: File | null;
    capacity: number;
    public_event: boolean;
    slug: string;
    organizer: string;
}
export default function Page(){

    const [field, setField] = useState<Field>({
        title: "",
        description: "",
        location: "",
        category: [],
        date: "",
        time: "",
        banner: null as File | null,
        capacity: 0,
        public_event:false,
        slug: "",
        organizer: ""

    })
    
    const category: Option[] = [
    {value: "Sport", label: "Sport"},
    {value: "Film", label: "Film"},
    {value: "Education", label: "Education"},
    {value: "Game", label: "Game"},

    {value: "Technology", label: "Technology"},
    {value: "Workshop", label: "Workshop"},
    {value: "Networking", label: "Networking"},
    {value: "Other", label: "Other"}
    ]
   
    const handleChange = (field: string, value: unknown) => {
        setField(prev => ({...prev, [field]: value})); //change the field got assign in onChange function in each component
    }
    const handleCategoryChange = (selected: {value:string,label:string}[]) => {
    handleChange("category", selected);
}
    const handleSubmit = async () => {
    // formDataHelp sending files without error
    const formData = new FormData();
    formData.append("title", field.title);
    formData.append("description", field.description);
    formData.append("location", field.location);
    
    if(field.banner) formData.append("banner", field.banner);

    formData.append("date", field.date);
    formData.append("timeime", field.time);
    

    formData.append("capacity", field.capacity.toString());
    formData.append("public_event", field.public_event ? "true" : "false");
    formData.append("slug", field.slug);
    formData.append("organizer", field.organizer);

    // append category
    field.category.forEach((c, i) => formData.append(`category[${i}]`, c.value));

    try {
        const res = await fetch("/api/events", {
            method: "POST",
            body: formData
        });
        if(res.ok){
            console.log("Event submitted successfully!");
        } else {
            console.log("Submit failed");
        }
    } catch(err) {
        console.error(err);
    }
};
    return(
        <>
        <PostEventHeader></PostEventHeader>
        <div className="flex gap-20">
            <div className="flex-1 ml-10">
                <EventBasicInfo 
                title={field.title}
                description={field.description}
                location={field.location}
                onChange={handleChange}
                ></EventBasicInfo>
                <Category
                options={category}
                placeholder="Choose your categories"
                onChange={handleCategoryChange}></Category>
                <DateAndTime 
                date={field.date}
                time={field.time}
                onChange={handleChange}></DateAndTime>
            </div>

            <div className="w-px bg-blue-200 h-110 flex mt-20 "></div>

            <div className="flex-1">
                <EventSettings 
                capacity={field.capacity} 
                public_event={field.public_event} 
                slug={field.slug}
                organizer={field.organizer}
                onChange={handleChange}></EventSettings>
                <EventBanner 
                file={field.banner}
                onChange={file => handleChange("banner", file)}></EventBanner>
                <SubmitButton onClick={handleSubmit}></SubmitButton>
            </div>

        </div>
        
       {/* <div className="bg-black text-white">
            <p>{field.title}</p>
            <p>{field.description}</p>
            <p>{field.location}</p>
            <p>{JSON.stringify(field.category)}</p>
            <p>{field.date}</p>
            <p>{field.time}</p>
        </div> */}
        {/*To test if passing value work fine*/}
        </>
    );
}