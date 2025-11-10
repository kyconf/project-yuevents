import Category from "./postEventCategory";
import {useState} from "react";
interface Props{
    title: string,
    description: string,
    location: string,
    onChange: (field: string, value: unknown) => void
}
export default function EventBasicInfo({title, description, onChange, location}:Props){
    

    const category = [
    {value: "Sport", lable: "Sport"},
    {value: "Film", lable: "Film"},
    {value: "Education", lable: "Education"},
    {value: "Game", lable: "Game"},

    {value: "Technology", lable: "Technology"},
    {value: "Workshop", lable: "Workshop"},
    {value: "Networking", lable: "Networking"},
    {value: "Other", lable: "Other"}
];
    return(
        <div className="text-blue-300 ml-5 mt-10">
            <form>
                <label className="">Event Title *</label>
                <input 
                type="text"
                placeholder="Event name"
                className="w-full border p-2 mb-4 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 " 
                required
                value={title}
                onChange={e => onChange("title", e.target.value)}
                ></input>

                <label>Description</label>
                <textarea
                placeholder="Event description"
                className="w-full border p-2 -pb-5 mb-4 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                value={description}
                onChange={e => onChange("description", e.target.value)}></textarea>
                

                <label className="">Location *</label>
                <input 
                type="text"
                placeholder="Event name"
                className="w-full border p-2 mb-4 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                required
                value={location}
                onChange={e => onChange("location", e.target.value)}
                ></input>
            </form>
        </div>
    );
}