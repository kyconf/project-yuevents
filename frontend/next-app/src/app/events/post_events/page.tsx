'use client'
import { useState } from "react";
import EventBasicInfo from "./components/postEventBasicInfo";
import DateAndTime from "./components/postEventDateAndTime";
import EventSettings from "./components/postEventSettings";
import EventBanner from "./components/postEventBanner";
import SubmitButton from "./components/postSubmitButton";
import PostEventHeader from "./components/postEventHeader";
export default function PostEventPage() {
  const [field, setField] = useState({
    title: "",
    description: "",
    location: "",
    start_at: "",
    end_at: "",
    rsvp_deadline: "",
    capacity: 0,
    is_public: false,
    slug: "",
    banner: "https://zpurdydmbdgqdsicfuaw.supabase.co/storage/v1/object/public/test_bucket/FurryBanner.png",
    club_id: "3c8366fb-c02d-4baa-9de3-ac230ac8be4a"
  });

  const handleChange = (key: string, value: unknown) => {
    setField((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const submitData = {
  ...field,
  start_at: new Date(field.start_at).toISOString(),
  end_at: new Date(field.end_at).toISOString(),
  rsvp_deadline: new Date(field.rsvp_deadline).toISOString(),
};
    try {
        const res = await fetch("http://127.0.0.1:8000/events/", {
            method: "POST",
            headers: {
             "Content-Type": "application/json"  
                      },
            body: JSON.stringify(submitData)
          
        });
        if(res.ok){
            console.log("Event submitted successfully!");
            console.log("Submitting event:", field);
            alert("Event submitted! Check console for data.");
        } else {
            console.log(JSON.stringify(field))
            console.log("Submit failed");
        }
    } catch(err) {
        console.error(err);
    
};
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <PostEventHeader></PostEventHeader>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 p-6 bg-gray-50 rounded-xl shadow-md mt-20">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          <EventBasicInfo
            title={field.title}
            description={field.description}
            location={field.location}
            onChange={handleChange}
          />
          <DateAndTime
            start_at={field.start_at}
            end_at={field.end_at}
            rsvp_deadline={field.rsvp_deadline}
            onChange={handleChange}
          />
        </div>

        {/* Divider */}
        <div className="hidden lg:flex w-px bg-blue-300 my-4"></div>

        {/* Right Column */}
        <div className="flex-1 space-y-6">
          <EventSettings
            capacity={field.capacity}
            is_public={field.is_public}
            slug={field.slug}
            onChange={handleChange}
          />
          <EventBanner file={field.banner} onChange={(file) => handleChange("banner", file)} />
          <div className="flex justify-end">
            <SubmitButton onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
