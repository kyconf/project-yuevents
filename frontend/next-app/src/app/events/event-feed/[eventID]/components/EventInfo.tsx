import { MdAccessTimeFilled } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { FaRegCalendarAlt } from "react-icons/fa";


interface EventInfo{
    start_date: string,
    start_time?: string,
    end_date: string,
    end_time: string,
    location: string
}

export default function EventInfo({start_date, start_time, end_date, end_time, location} : EventInfo){
    return(
        <div className="flex flex-col pl-20 mt-5 gap-2">
              <div>
                <FaRegCalendarAlt></FaRegCalendarAlt>
                <div>
                    <p>{start_date} - {end_date}</p>
                </div>
              </div>

              <div>
                <MdAccessTimeFilled></MdAccessTimeFilled>
                <div>
                    <p>{start_time} - {end_time}</p>
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