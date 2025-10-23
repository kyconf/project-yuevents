import Event from "@/assets/event.jpg"
import Club from "@/assets/club.jpg"
import Team from "@/assets/team.jpg"
import Image from "next/image"
function Links(){
   return(
    <div className="flex flex-col items-center gap-10 px-4 py-10">
        <h1 className=" text-3xl sm:text-3xl md:text-5xl font-mono font-bold text-blue-200 leading-tight">Explore Now !</h1>
  <div className="flex  md:flex-row border-4 border-solid border-blue-600 rounded-xl p-6 max-w-5xl items-center md:items-start justify-between gap-6 bg-white shadow-lg mr-60">
    
    <div className="flex-1 text-left ">
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-5">
        Discover upcoming events designed to inspire, entertain, and connect you with others. 
        Whether it’s a seminar, a festival, or a casual meet-up, you’ll find experiences that match your interests. 
        Get involved and make your days more exciting!
      </p>
      <a className="mt-10">Find out now ! /Click to forward to event list/</a>
    </div>


    <div className="flex-shrink-0">
      <Image src={Event} alt="event" width={200} height={200} className="rounded-lg object-cover" />
    </div>
    

  </div>

  <div className="flex md:flex-row-reverse border-4 border-solid border-blue-600 rounded-xl p-6 max-w-5xl items-center md:items-start justify-between gap-6 bg-white shadow-lg ml-60">
    
    <div className="flex-1 text-left ">
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-5">
       Discover a variety of clubs you can join and explore. Each club offers unique activities, events, and opportunities to meet like-minded people. Find the one that matches your interests and start your journey today. Get involved, make friends, and have fun!
      </p>
      <a className="mt-10">Find out now ! /Click to forward to event list/</a>
    </div>


    <div className="flex-shrink-0">
      <Image src={Club} alt="event" width={200} height={200} className="rounded-lg object-cover" />
    </div>
    

  </div>

  <div className="flex md:flex-row border-4 border-solid border-blue-600 rounded-xl p-6 max-w-5xl items-center md:items-start justify-between gap-6 bg-white shadow-lg mr-60">
    
    <div className="flex-1 text-left ">
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-5">
        Ready to be part of something amazing? Join us and become a member of our vibrant community. Connect with like-minded people, participate in exciting activities, and grow your skills. Your journey with us starts here!
      </p>
      <a className="mt-10">Find out now ! /Click to forward to event list/</a>
    </div>


    <div className="flex-shrink-0">
      <Image src={Team} alt="event" width={200} height={200} className="rounded-lg object-cover" />
    </div>
    

  </div>
</div>
   );
}
export default Links