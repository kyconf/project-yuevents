import { MdAccessTimeFilled } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { FaRegCalendarAlt } from "react-icons/fa";


interface EventInfo{
    date: string,
    time?: string,
    location: string
}

export default function EventInfo({date, time, location} : EventInfo){
    return(
        <div className="flex flex-col pl-20 mt-5 gap-2">
              <div>
                <FaRegCalendarAlt></FaRegCalendarAlt>
                <div>
                    <p>{date}</p>
                </div>
              </div>

              <div>
                <MdAccessTimeFilled></MdAccessTimeFilled>
                <div>
                    <p>{time}</p>
                </div>
              </div>
              
              <div>
                <ImLocation2></ImLocation2>
                <div>
                    <p>{location}</p>
                </div>
              </div>
        </div>
    );
}