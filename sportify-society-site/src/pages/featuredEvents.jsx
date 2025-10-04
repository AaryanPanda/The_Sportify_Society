import { useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import EventsList from "../components/upcomingEventsList";
import { upcomingEvents as featuredEvents } from "../lib/data";
import eventBgImage from "../assets/Event-BG.jpeg";
import featEve1 from "../assets/Featured-events/Event-1.jpg";
import featEve2 from "../assets/Featured-events/Event-2.png";
import Loader from "../components/loader"; // ✅ Import the new Loader component

export default function FeaturedEventsPage() {
  
  // Scroll to the top of the page whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts or route changes
  }, []); // Dependency on location ensures this happens on route change

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-10 py-10 md:py-16">
        {/* New Header Section */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-bold text-center mb-12 mt-12 text-white relative">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] to-[#ffe808]">Events</span>
          <div className="absolute -bottom-4 left-0 right-0 flex justify-center w-full">
            <div className="relative h-[2px] w-3/5 sm:w-4/5">
              {/* Main gradient underline */}
              <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a00] to-transparent rounded-full"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 rounded-full blur-sm"></div>

              {/* Extra subtle reflection */}
              <div className="absolute inset-0 h-[1px] top-[3px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-[0.5px]"></div>
            </div>
          </div>
        </h1>
          <span className="text-orange-300 text-center text-lg font-medium">Handpicked highlights & special moments</span>
        </div>

        {/* Card-based Featured Events List */}
        <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">
          {/* Ultimate IPL Auction */}
          <div className="bg-gradient-to-r from-[#ff5a00]/40 via-[#ffe808]/20 to-[#ffae00]/40 rounded-2xl shadow-xl border border-orange-300 p-10 flex flex-col items-center w-full max-w-2xl md:max-w-xl mx-auto md:mx-0" style={{boxSizing: 'border-box'}}>
            <div className="w-64 pt-1 pb-1 h-64 flex items-center justify-center bg-orange-300 rounded-xl mb-6 border-2 border-orange-400 shadow-lg overflow-hidden group" style={{boxShadow: 'inset 0 0 48px 0 rgba(0,0,0,0.32)'}}>
                <img src={featEve1} alt="Ultimate IPL Auction" className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 rounded-2xl" />
            </div>
            <div className="w-full flex flex-col items-center">
              <h3 className="text-2xl font-bold text-white mb-1 text-center">Ultimate IPL Auction</h3>
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#ff5a00]/80 to-[#ffe808]/80 text-black text-xs font-semibold mb-3 w-fit">Strategy Competition</span>
              <p className="text-orange-100 text-base mb-2 text-center">24 April - 27 April, 2025 &bull; Google Meet</p>
              <p className="text-gray-200 text-xs mb-6 text-center">Participants stepped into the shoes of franchise owners, bidding strategically to build their dream teams under a fixed budget. The event was filled with intense bidding wars, clever tactics, and loads of cricket banter.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Cricket', 'Auction', 'Strategy', 'Teamwork'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[#181818] text-orange-300 text-xs font-medium border border-orange-700/40">{tag}</span>
                ))}
              </div>
              {/* Past Event tag removed */}
            </div>
          </div>

          {/* Ultimate Sports Quiz */}
          <div className="bg-gradient-to-r from-[#ffae00]/40 via-[#ffe808]/20 to-[#ff5a00]/40 rounded-2xl shadow-xl border border-orange-300 p-10 flex flex-col items-center w-full max-w-2xl md:max-w-xl mx-auto md:mx-0" style={{boxSizing: 'border-box'}}>
            <div className="w-64 pt-1 pb-1 h-64 flex items-center justify-center bg-orange-300 rounded-xl mb-6 border-2 border-orange-400 shadow-lg overflow-hidden group" style={{boxShadow: 'inset 0 0 48px 0 rgba(0,0,0,0.32)'}}>
                <img src={featEve2} alt="Ultimate Sports Quiz" className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 rounded-2xl" />
            </div>
            <div className="w-full flex flex-col items-center">
              <h3 className="text-2xl font-bold text-white mb-1 text-center">Ultimate Sports Quiz</h3>
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#ffe808]/80 to-[#ff5a00]/80 text-black text-xs font-semibold mb-3 w-fit">Quiz Competition</span>
              <p className="text-orange-100 text-base mb-2 text-center">5 June - 6 June, 2025 &bull; BioTech Hall, IIT Madras</p>
              <p className="text-gray-200 text-xs mb-6 text-center">Get ready to put your sports knowledge to the ultimate test! The Ultimate Sports Quiz at Paradox’25 is a thrilling challenge for sports enthusiasts, testing knowledge of legendary moments, records, and tricky trivia.</p>
              <div className="flex flex-wrap gap-2 mb-2 justify-center">
                {['Quiz', 'Sports', 'Trivia'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[#181818] text-orange-300 text-xs font-medium border border-orange-700/40">{tag}</span>
                ))}
              </div>
              {/* Past Event tag removed */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}