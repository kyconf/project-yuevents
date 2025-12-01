interface EventDescription{
    description: string
    rsvp_deadline: string, 
    capacity: number, 
    is_public: boolean, 
    slug: string, 
    created_at: string, 
    updated_at: string,
}

export default function EventDescription({description, rsvp_deadline, capacity, is_public, slug, created_at, updated_at}:EventDescription){
    return(<div className="mt-15 w-300 ">
        <h1 className="font-bold">Description</h1>
        <p className="mt-2">{description}</p>

        <br></br>
        <h1 className="font-bold">📅 RSVP Deadline</h1>
        <p className="mt-2">Make sure to RSVP before <strong>{rsvp_deadline}</strong> to secure your spot. Seats are limited, so registering early ensures you won’t miss out on this exciting event.</p>

        <br></br>
        <h1 className="font-bold">👥 Capacity</h1>
        <p className="mt-2">This event can accommodate up to <strong>{capacity}</strong> participants. We aim to create a friendly and engaging environment, so the number of attendees will be carefully managed</p>

        <br></br>
        <h1 className="font-bold">🌐 Public / Private</h1>
        <p className="mt-2">This event is <strong>{is_public ? "public" : "private"}</strong>, meaning {is_public ? "everyone" : "only invited guest"} can attend. Please check the event details before registering.</p>

        <br></br>
        <p className="font-extralight mt-5"><em>**The event was created on {created_at} and last updated on {updated_at}. All the latest updates will be reflected on the event page.</em></p>
        </div>
    );
}