import Image from 'next/image'
interface EventBannerProps {
  file: File | string;
  onChange: (file: File | string) => void;
}

export default function EventBanner({ file, onChange }: EventBannerProps) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">Event Banner</label>
      <input
        type="file"
        onChange={(e) => onChange(e.target.files?.[0] || "")}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {file && (
        <Image
          width={700}
          height={300}
          src={typeof file === "string" ? file : URL.createObjectURL(file)}
          alt="Banner Preview"
          className="mt-4 rounded-lg w-full object-cover h-48"
        />
      )}
    </div>
  );
}
