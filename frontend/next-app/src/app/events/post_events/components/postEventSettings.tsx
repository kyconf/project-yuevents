interface EventSettingsProps {
  capacity: number;
  is_public: boolean;
  slug: string;
  onChange: (field: string, value: unknown) => void;
}

export default function EventSettings({ capacity, is_public, slug, onChange }: EventSettingsProps) {
  return (
    <div className="space-y-4">
      <label className="block text-gray-700 font-semibold">Capacity</label>
      <input
        type="number"
        value={capacity}
        onChange={(e) => onChange("capacity", Number(e.target.value))}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Max number of participants"
      />

      <label className="block text-gray-700 font-semibold">Public Event?</label>
      <select
        value={is_public ? "true" : "false"}
        onChange={(e) => onChange("is_public", e.target.value === "true")}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <label className="block text-gray-700 font-semibold">Slug</label>
      <input
        type="text"
        value={slug}
        onChange={(e) => onChange("slug", e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="event-slug"
      />
    </div>
  );
}
