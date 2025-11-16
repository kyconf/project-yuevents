interface EventBasicInfoProps {
  title: string;
  description: string;
  location: string;
  onChange: (field: string, value: unknown) => void;
}

export default function EventBasicInfo({ title, description, location, onChange }: EventBasicInfoProps) {
  return (
    <div className="space-y-4">
      <label className="block text-gray-700 font-semibold">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => onChange("title", e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Event title"
      />

      <label className="block text-gray-700 font-semibold">Description</label>
      <textarea
        value={description}
        onChange={(e) => onChange("description", e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
        placeholder="Event description"
      />

      <label className="block text-gray-700 font-semibold">Location</label>
      <input
        type="text"
        value={location}
        onChange={(e) => onChange("location", e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Event location"
      />
    </div>
  );
}
