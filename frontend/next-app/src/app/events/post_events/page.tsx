'use client'
import { useState } from "react";
import {supabase} from "../../../../../supabaseClient"
import EventBasicInfo from "./components/postEventBasicInfo";
import DateAndTime from "./components/postEventDateAndTime";
import EventSettings from "./components/postEventSettings";
import EventBanner from "./components/postEventBanner";
import SubmitButton from "./components/postSubmitButton";
import PostEventHeader from "./components/postEventHeader";
export default function PostEventPage() {
  const [field, setField] = useState<{
     title: string;
     description: string;
     location: string;
     start_at: string;
     end_at: string;
     rsvp_deadline: string;
     capacity: number;
     is_public: boolean;
     slug: string;
     banner: string | File; 
     club_id: string;
  }>({
    title: "",
    description: "",
    location: "",
    start_at: "",
    end_at: "",
    rsvp_deadline: "",
    capacity: 0,
    is_public: false,
    slug: "",
    banner: "",
    club_id: "3c8366fb-c02d-4baa-9de3-ac230ac8be4a"
  });

  const handleChange = (key: string, value: unknown) => {
    setField((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
  let bannerUrl = field.banner;
  
  try {

    if (field.banner instanceof File) {
      const fileName = `${Date.now()}-${field.banner.name}`;
      
      const { data, error } = await supabase.storage
        .from('test_bucket')
        .upload(fileName, field.banner, { upsert: true });

      if (error) {
        console.error('Upload error:', error);
        alert('Failed to upload banner');
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('test_bucket')
        .getPublicUrl(fileName);
      
      bannerUrl = urlData.publicUrl;
    }


    const eventData = {
      title: field.title,
      description: field.description || "",
      location: field.location || "",
      start_at: new Date(field.start_at).toISOString(),
      end_at: new Date(field.end_at).toISOString(),
      rsvp_deadline: new Date(field.rsvp_deadline).toISOString(),
      capacity: Number(field.capacity),
      is_public: field.is_public,
      slug: field.slug || "",
      club_id: field.club_id,
      banner: typeof bannerUrl === 'string' ? bannerUrl : ""
    };

    console.log('Sending data:', eventData); 

    const res = await fetch("http://127.0.0.1:8000/events/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(eventData) 
    });

    const responseData = await res.json();
    console.log('Response:', responseData);

    if (res.ok) {
      alert("Event created successfully!");
      window.location.href = '/events';
    } else {
      console.error("Submit failed:", responseData);
      alert(`Failed: ${JSON.stringify(responseData)}`);
    }
    
  } catch (err) {
    console.error('Error submitting event:', err);
    alert('An error occurred while submitting the event');
  }
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
