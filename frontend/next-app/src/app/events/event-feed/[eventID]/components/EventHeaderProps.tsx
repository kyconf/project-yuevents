
interface EventHeaderInfo{
    title: string,

    organizer: string
}

export default function EventHeaderProp({title,organizer} : EventHeaderInfo){
    return(
        <div className="flex">
           
            <div className="flex flex-col pl-20">
            <h1 className="text-4xl font-bold font-mono">{title}</h1>
            <div className="">
                <p className="font-extralight">{organizer}</p>
            </div>
              
            </div>
        </div>

    );
}