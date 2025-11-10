interface Props{
    capacity: number,
    public_event: boolean,
    slug: string,
    organizer: string,
    onChange: (field:string, value:unknown) => void;

}



export default function EventSettings({capacity, public_event, slug, organizer, onChange}:Props){
     return (
    <div className=" text-blue-300 ">

      <form className="flex flex-col mt-9 mr-15 justify-between">
        {/* Capacity */}
        <div className="flex flex-col">
          <label className="mb-1">Capacity</label>
          <input
            type="number"
            min={1}
            className="w-full border p-2 mb-4 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter max attendees"
            required
            value={capacity}
            onChange={e => onChange("capacity", e.target.value)}
          />
        </div>

        {/* Visibility */}
        <div className="flex items-center justify-between mt-5 mb-5">
          <label className="">Public Event</label>
          <input
            type="checkbox"
            className="w-5 h-5 accent-blue-500"
            checked={public_event}
            onChange={e => onChange("public_event", e.target.checked)}
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col mb-3">
          <label className="mb-1">Custom Slug</label>
          <input
            type="text"
            className="w-full border p-2 mb-4 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your-event-name"
            value={slug}
            onChange={e => onChange("slug", e.target.value)}
          />
        </div>

        {/* Organizer info */}
        <div className="flex flex-col mb-3">
          <label className="mb-1">Organizer Name</label>
          <input
            type="text"
            className="w-full border p-2 mb-4 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name of your organization"
            required
            value={organizer}
            onChange={e => onChange("organizer", e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}