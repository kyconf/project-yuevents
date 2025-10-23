import Image from "next/image";
import P1 from '../assets/P1.webp';
import P5 from '../assets/P5.jpg';
import P3 from '../assets/P3.jpg';
import P4 from '../assets/P4.webp';

// Định nghĩa props type
type HeroSectionProps = {
  onExploreNowClick: () => void;
  onAboutUsClick: () => void;
};

function Hero_Section({ onExploreNowClick, onAboutUsClick }: HeroSectionProps) {
    return(
        <>
         <section className="pt-20 relative flex items-center justify-center h-screen overflow-hidden px-6">
            <div className="max-w-7xl w-full flex flex-col md:flex-row items-center md:items-start gap-10">
                <div className="flex-1 text-center md:text-left">
                   <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-200 leading-tight mb-5">
                     Join campus life — Discover what is happening around you!
                   </h1>
                   <p className="font-extrabold text-blue-200 leading-tight">
                     Explore new events, activities and connect with many communities and clubs that share the same hobby with you 
                   </p>
                   
                   {/* onClick handlers */}
                   <button 
                     onClick={onExploreNowClick}
                     className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-900 transition cursor-pointer"
                   >
                     Explore Now
                   </button>
                   <button 
                     onClick={onAboutUsClick}
                     className="mt-6 px-6 py-3 bg-white-600 text-blue-200 rounded-xl ml-5 transition cursor-pointer"
                   >
                     About Us
                   </button>
                </div>

               <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 md:gap-6">
                 <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-lg">
                   <Image src={P1} alt="Deco 1" fill style={{ objectFit: "cover" }} />
                 </div>
                 <div className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden shadow-lg translate-y-6">
                   <Image src={P5} alt="Deco 2" fill style={{ objectFit: "cover" }} />
                 </div>
                 <div className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden shadow-lg -translate-y-6 mt-10">
                   <Image src={P3} alt="Deco 3" fill style={{ objectFit: "cover" }} />
                 </div>
                 <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-lg">
                   <Image src={P4} alt="Deco 4" fill style={{ objectFit: "cover" }} />
                 </div>
               </div>
            </div>
         </section>
         
         <hr className="w-250 mx-auto"></hr>
       </>
    );
}

export default Hero_Section;