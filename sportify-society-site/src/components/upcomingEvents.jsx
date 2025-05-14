// src/components/UpcomingEvents.jsx

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { upcomingEvents } from "../lib/data";
import EventsList from "./upcomingEventsList"; // ✅ Reuse the list component
import { Button } from "../ui/buttons";

export default function UpcomingEvents() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950 px-16"
      id="upcoming-events"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Upcoming{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400">
              Events
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't miss out on our exciting upcoming sports events. Mark your
            calendars and join us for thrilling competitions and activities.
          </p>
        </div>

        {/* ✅ Use EventsList and only show 3 events */}
        <div className="scroll-reveal">
          <EventsList events={upcomingEvents.slice(0, 3)} />
        </div>

        {/* View All Events Button */}
        <div className="text-center mt-12 scroll-reveal flex items-center justify-center">
          <Link to="/upcoming-events">
            <Button className="px-6 py-3 text-white font-medium rounded-lg bg-[#cc4e00] hover:bg-[#e65c00] active:bg-[#b34000] transition-all shadow-md hover:shadow-lg flex items-center justify-center">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
