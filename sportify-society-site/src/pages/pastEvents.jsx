// src/PastEventsPage.jsx
import { useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import EventsList from "../components/eventsList";
import { pastEvents } from "../lib/data";

export default function PastEventsPage() {


  // Scroll to the top of the page whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts or route changes
  }, []); // Dependency on location ensures this happens on route change

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-center mb-12 text-white">
          Past{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] to-[#ffe808]">
            Events
          </span>
        </h1>

        {/* Events List */}
        <EventsList events={pastEvents} />
      </div>
      <Footer />
    </main>
  );
}
