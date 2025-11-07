import Image from "next/image"
import FurryBanner from "@/app/events/event-feed/temp_assets/FurryBanner.png"

interface EventBanner{
    banner: string,
    title: string,
}

export default function EventBanner({banner, title}: EventBanner){
   return( <Image src={FurryBanner} alt={title} width={600} height={300} className="rounded-md " />);
}