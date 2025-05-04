// src/components/PastEvents.jsx

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/buttons";
import { pastEvents } from "../lib/data";

export default function PastEvents() {
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
      id="past-events"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Past{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808]">
              Events
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Relive the excitement and memories from our previous events. Check
            out the highlights and achievements from our past competitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-reveal">
          {pastEvents.slice(0, 2).map((event, index) => (
            <div
              key={event.id}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row transform hover:scale-[1.02] transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="md:w-2/5 h-48 md:h-auto relative">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Content */}
              <div className="md:w-3/5 p-6 flex flex-col justify-center gap-4">
                {/* Title + Date */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                  <span className="text-sm text-white px-2 py-1 rounded bg-gradient-to-r from-[#ff4500]/20 via-[#ff6a00]/30 to-[#ffce00]/40">
                    {event.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {event.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-gray-800 text-[#f69e34]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 scroll-reveal flex items-center justify-center">
          <Link to="/past-events">
            <Button className="px-6 py-3 text-white font-medium rounded-lg bg-[#cc4e00] hover:bg-[#e65c00] active:bg-[#b34000] transition-all shadow-md hover:shadow-lg flex items-center justify-center">
              View All Past Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
