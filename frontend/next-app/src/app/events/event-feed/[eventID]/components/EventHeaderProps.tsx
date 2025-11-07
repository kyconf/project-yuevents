import Link from 'next/link'
interface EventHeaderInfo{
    title: string,
    category: string[],
    organizer: string
}

export default function EventHeaderProp({title, category, organizer} : EventHeaderInfo){
    return(
        <div className="flex">
           
            <div className="flex flex-col pl-20">
            <h1 className="text-4xl font-bold font-mono">{title}</h1>
            <div className="flex justify-between">
                <div>{category.map((cat) => (<span key={cat} className="mr-4 pl-1 font-mono font-extralight">{cat}</span>))}</div>
                <p className="font-extralight">{organizer}</p>
            </div>
              
            </div>
        </div>

    );
}