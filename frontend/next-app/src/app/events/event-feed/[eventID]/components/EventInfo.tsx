interface EventInfo {
    start_date: string,
    start_time?: string,
    end_date: string,
    end_time: string,
    location: string
}

export default function EventInfo({ start_date, start_time, end_date, end_time, location }: EventInfo) {
    return (
        <div className="space-y-4">
            {/* Date Card */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <p className="text-slate-500 text-xs font-semibold uppercase">Date</p>
                    <p className="text-slate-900 font-bold">{start_date}</p>
                    {start_date !== end_date && (
                        <p className="text-slate-600 text-sm">to {end_date}</p>
                    )}
                </div>
            </div>

            {/* Time Card */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-slate-500 text-xs font-semibold uppercase">Time</p>
                    <p className="text-slate-900 font-bold">{start_time} - {end_time}</p>
                </div>
            </div>

            {/* Location Card */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <p className="text-slate-500 text-xs font-semibold uppercase">Location</p>
                    <p className="text-slate-900 font-bold">{location}</p>
                </div>
            </div>
        </div>
    );
}