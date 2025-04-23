// src/components/UpcomingEvents.jsx

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Adjust for Vite routing
import { upcomingEvents } from "../lib/data"; // Adjust the import path based on your folder structure
import { Calendar, MapPin, Clock } from "lucide-react"; // Assuming lucide-react is installed
import { Button } from "../ui/buttons"; // Adjust import based on your folder structure
import { Card, CardContent } from "../ui/card"; // Assuming you have a Card component

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
      className="py-20 bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950"
      id="upcoming-events"
    >
      <div className="container mx-auto px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {" "}
          {/* Increased gap */}
          {upcomingEvents.slice(0, 3).map((event, index) => (
            <Card
              key={event.id}
              className="overflow-hidden event-card scroll-reveal hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br"
              style={{ transitionDelay: `${index * 100}ms`, transform: "none" }} // No scaling
            >
              <div className="h-40 bg-gray-200 dark:bg-gray-800 relative rounded-lg">
                {" "}
                {/* Smaller size */}
                <div
                  className="w-full h-full bg-cover bg-center rounded-t-lg "
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute top-4 right-4 text-sm font-medium text-white px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400">
                  {event.category}
                </div>
              </div>
              <CardContent className="p-4">
                {" "}
                {/* Smaller padding */}
                <h3 className="text-xl font-bold mb-2 text-white">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-2 text-flame" />
                    <span className="text-sm text-gray-300">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-2 text-flame" />
                    <span className="text-sm text-gray-300">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-4 w-4 mr-2 text-flame" />
                    <span className="text-sm text-gray-300">
                      {event.location}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {event.description}
                </p>
                <Button className="w-full flex items-center justify-center bg-gradient-to-r from-[#ff4500]/10 via-[#ff6a00]/20 to-[#ffce00]/30 hover:from-[#ff4500]/20 hover:via-[#ff6a00]/30 hover:to-[#ffce00]/40 text-white py-3 px-6 rounded-lg transition-all duration-300">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
