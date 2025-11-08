import Category from "./postEventCategory";

export default function EventBasicInfo(){
    const category = [
    {value: "Sport", lable: "Sport"},
    {value: "Film", lable: "Film"},
    {value: "Education", lable: "Education"},
    {value: "Game", lable: "Game"},

    {value: "Technology", lable: "Technology"},
    {value: "Workshop", lable: "Workshop"},
    {value: "Networking", lable: "Networking"},
    {value: "Other", lable: "Other"}
];
    return(
        <div className="text-blue-300 ml-5 mt-10">
            <form>
                <label className="">Event Title *</label>
                <input 
                type="text"
                placeholder="Event name"
                className="w-full border p-2 mb-4 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                ></input>

                <label>Description</label>
                <textarea
                placeholder="Event description"
                className="w-full border p-2 -pb-5 mb-4 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "></textarea>

                <label className="">Location *</label>
                <input 
                type="text"
                placeholder="Event name"
                className="w-full border p-2 mb-4 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                ></input>
                
                <div className="flex gap-10 mt-5">
                  <label>Category</label>
                    <div className=" rounded cursor-pointer bg-white text-blue-600">
                        <Category options={category} placeholder="Choose your categories"></Category>
                    </div>
                </div>
            </form>
        </div>
    );
}