import Image from "next/image"

interface EventBanner {
    banner: string,
    title: string,
}

export default function EventBanner({ banner, title }: EventBanner) {
    return (
        <div className="relative w-full h-[85vh]  ">
            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                    width={1100}
                    height={300}
                    src={banner}
                    alt={title}
                    className="relative"
                    priority
                />
                
            </div>
        </div>
    );
}