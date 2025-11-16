interface DateAndTimeProps {
  start_at: string;
  end_at: string;
  rsvp_deadline: string;
  onChange: (field: string, value: unknown) => void;
}

// Turn ISO timestamp -> datetime-local string
export function toInputDateTime (ts: string) {
  if (!ts) return "";
  const d = new Date(ts);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

export default function DateAndTime({ start_at, end_at, rsvp_deadline, onChange }: DateAndTimeProps) {
  const handleChange = (field: string, value: string) => {
    onChange(field, new Date(value).toISOString());
  };

  return (
    <div className="space-y-4">
      <label className="block text-gray-700 font-semibold">Start At</label>
      <input
        type="datetime-local"
        value={toInputDateTime(start_at)}
        onChange={(e) => handleChange("start_at", e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label className="block text-gray-700 font-semibold">End At</label>
      <input
        type="datetime-local"
        value={toInputDateTime(end_at)}
        onChange={(e) => handleChange("end_at", e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label className="block text-gray-700 font-semibold">RSVP Deadline</label>
      <input
        type="datetime-local"
        value={toInputDateTime(rsvp_deadline)}
        onChange={(e) => handleChange("rsvp_deadline", e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
