import Image from "next/image"


interface EventBanner{
    banner: string,
    title: string,
}

export default function EventBanner({banner, title}: EventBanner){
   return( <Image src={banner} alt={title} width={600} height={300} className="rounded-md " />);
}