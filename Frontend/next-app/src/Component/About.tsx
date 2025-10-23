function About(){
    return(
       <section id="about-section"> 
         <div className="flex justify-center items-start gap-100 px-6 py-16 bg-gray-50">
           <div className="max-w-100">
             <h1 className="text-3xl sm:text-3xl md:text-3xl font-extrabold text-blue-500 leading-tight mb-5">
               What is Yu-Events ?
             </h1>
             <p>
               Welcome to YU Events – your one-stop hub for everything happening on campus! From student club meetups to workshops, sports tournaments, and cultural celebrations, YU Events keeps you in the loop. Explore, join, and make the most of your university experience!
             </p>
           </div>

           <div className="max-w-100">
             <h1 className="text-3xl sm:text-3xl md:text-3xl font-extrabold text-blue-500 leading-tight mb-5">
               Join our community
             </h1>
             <p>
               Join our campus community and connect with like-minded students! Explore clubs, events, and activities that help you make friends, learn new skills, and be part of something exciting
             </p> 
             <p className="mt-2">Join the community, shape your experience.</p>
           </div>
         </div>
         <hr className="w-250 mx-auto"></hr>
       </section> 
    );
}

export default About;