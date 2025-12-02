interface EventHeaderInfo {
    title: string,
    organizer: string
}

export default function EventHeaderProp({ title, organizer }: EventHeaderInfo) {
    return (
        <div className="">
            <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 leading-tight mb-3">
                {title}
            </h1>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                <p className="text-slate-600 font-medium">
                    Organized by {organizer}
                </p>
            </div>
        </div>
    );
}