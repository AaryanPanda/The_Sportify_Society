import { useState } from "react";
import { teamMembers } from "../lib/data";
import { Github, Linkedin, Mail, Filter, Search } from "lucide-react";

export default function TeamMembers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");

  // Get unique positions
  const positions = [
    "all",
    ...Array.from(
      new Set(
        teamMembers
          .map((member) => member.position?.trim())
          .filter(Boolean)
          .map(
            (pos) => pos.charAt(0).toUpperCase() + pos.slice(1).toLowerCase()
          )
      )
    ),
  ];

  // Filtered team members
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase());

    const normalizedPosition =
      member.position &&
      member.position.charAt(0).toUpperCase() +
        member.position.slice(1).toLowerCase();

    const matchesPosition =
      positionFilter === "all" || normalizedPosition === positionFilter;

    return matchesSearch && matchesPosition;
  });

  return (
    <div className="w-full">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
          />
        </div>

        {/* Position Filter */}
        <div className="relative md:w-64">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="w-full appearance-none pl-10 pr-8 py-2 rounded-lg bg-[#1a1a1a] text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff6a00]"
            >
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos === "all" ? "All Positions" : pos}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Members List */}
      {filteredMembers.length === 0 ? (
        <p className="text-center text-gray-400 py-10">
          No team members found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMembers.map((member, index) => (
            <div
              key={member.id}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-md scroll-reveal transform hover:transition-transform duration-300 hover:shadow-lg"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="h-40 relative">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-1 text-white">
                  {member.name}
                </h3>
                <p className="text-xs font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffb700] to-[#ffe808]">
                  {member.position}
                </p>
                <p className="text-gray-300 text-xs leading-snug mb-4 line-clamp-3">
                  {member.bio}
                </p>

                <div className="flex justify-center space-x-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#ff9a00] transition-colors duration-200"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#ff9a00] transition-colors duration-200"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-[#ff9a00] transition-colors duration-200"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
