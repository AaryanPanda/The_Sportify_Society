import { useState } from "react";
import { teamMembers } from "../lib/data";
import { Github, Linkedin, Mail, Filter, Search } from "lucide-react";

export default function TeamMembers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Core");


  // Get unique categories
  const categories = [
    "all",
    ...Array.from(
      new Set(
        teamMembers
          .map((member) => member.category?.trim())
          .filter(Boolean)
          .map(
            (cat) => cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()
          )
      )
    ),
  ];

  // Filtered team members
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.category.toLowerCase().includes(searchQuery.toLowerCase());

    const normalizedCategory =
      member.category &&
      member.category.charAt(0).toUpperCase() +
        member.category.slice(1).toLowerCase();

    const matchesCategory =
      categoryFilter === "all" || normalizedCategory === categoryFilter;

    return matchesSearch && matchesCategory;
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
      className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff8a00]"
    />
  </div>

  {/* Category Filter */}
  <div className="relative md:w-64">
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-full appearance-none pl-10 pr-8 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff8a00]"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "all" ? "All Departments" : cat}
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
              className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-md scroll-reveal transform transition-transform duration-300 hover:shadow-lg"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Flame Corner Borders */}
              <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden">
                <div className="absolute w-1 h-10 bg-gradient-to-b from-[#ff3c14] via-[#ff8c14] to-transparent opacity-80"></div>
                <div className="absolute w-10 h-1 bg-gradient-to-r from-[#ff3c14] via-[#ff8c14] to-transparent opacity-80"></div>
              </div>
              <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden">
                <div className="absolute right-0 w-1 h-10 bg-gradient-to-b from-[#ff3c14] via-[#ff8c14] to-transparent opacity-80"></div>
                <div className="absolute w-10 h-1 bg-gradient-to-r from-transparent via-[#ff8c14] to-[#ff3c14] opacity-80"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-10 h-10 overflow-hidden">
                <div className="absolute bottom-0 w-1 h-10 bg-gradient-to-t from-[#ff3c14] via-[#ff8c14] to-transparent opacity-80"></div>
                <div className="absolute bottom-0 w-10 h-1 bg-gradient-to-r from-[#ff3c14] via-[#ff8c14] to-transparent opacity-80"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-10 h-10 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-1 h-10 bg-gradient-to-t from-[#ff3c14] via-[#ff8c14] to-transparent opacity-80"></div>
                <div className="absolute bottom-0 w-10 h-1 bg-gradient-to-r from-transparent via-[#ff8c14] to-[#ff3c14] opacity-80"></div>
              </div>

              {/* Image */}
              <div className="h-56 relative">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover object-top w-full h-full transition-all duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-1 text-white">
                  {member.name}
                </h3>
                <div className="flex flex-col gap-1 mb-3">
                  <p className="text-gray-300 text-xs font-medium">
                    {member.position}
                  </p>
                  <p className="capitalize text-s font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffb700] to-[#ffe808]">
                    {member.category}
                  </p>
                </div>
                <div className="w-30 h-px mx-auto bg-gradient-to-r from-transparent via-[#ff9a00] to-transparent mb-3"></div>
                <p className="text-gray-400 text-xs leading-snug mb-4 line-clamp-3">
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
