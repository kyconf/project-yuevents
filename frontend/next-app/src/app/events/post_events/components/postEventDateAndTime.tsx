interface Props{
    date: string,
    time: string
    onChange: (field: string, value: unknown) => void
}




export default function DateAndTime({date, time, onChange}:Props){
    return(
     <div className="text-blue-300">
         <form className="flex mt-8 ml-5 justify-between">
            {/*Date section*/}
            <div className="flex flex-col">
                <label>Date *</label>
                <input 
                type="date" 
                className="mt-5 border p-5 bg-white text-md  text-blue-500 rounded-xl font-mono" 
                required
                value={date}
                onChange={e => onChange("date", e.target.value)}></input>
            </div>

            {/*Time section*/}
            <div className="flex flex-col">
                <label>Time *</label>
                <input 
                type="time" 
                className="mt-5 border p-5 bg-white text-md  text-blue-500 rounded-xl font-mono" 
                required
                value={time}
                onChange={e => onChange("time", e.target.value)}></input>
            </div>
         </form>
     </div>
    );
}