interface EventDescription{
    description: string
}

export default function EventDescription({description}:EventDescription){
    return(<div className="mt-15 w-300 ">
        <h1 className="font-bold">Description</h1>
        <p className="mt-2">{description}</p>
        </div>
    );
}