// src/components/Team.jsx

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { teamMembers } from "../lib/data";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../ui/buttons";

export default function Team() {
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
      id="team"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808]">
              Team
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the dedicated individuals who make Sportify possible. Our team works tirelessly to organize events and
            promote the joy of sports.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.slice(0, 4).map((member, index) => (
            <div
              key={member.id}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg overflow-hidden shadow-lg scroll-reveal transform transition-transform duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-64 relative">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] to-[#ffe808] mb-3">
                  {member.position}
                </p>
                <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#ff9a00] transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#ff9a00] transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-[#ff9a00] transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 scroll-reveal flex items-center justify-center">
          <Link to="/team">
            <Button className="px-6 py-3 text-white font-medium rounded-lg bg-[#cc4e00] hover:bg-[#e65c00] active:bg-[#b34000] transition-all shadow-md hover:shadow-lg flex items-center justify-center">
              Meet the Entire Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
