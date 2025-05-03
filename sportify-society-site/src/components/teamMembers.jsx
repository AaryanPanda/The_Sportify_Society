import { useState, useEffect } from "react";
import { teamMembers } from "../lib/data";
import { Github, Linkedin, Mail, Filter, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamMembers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [visibleSection, setVisibleSection] = useState(null);

  // Define category order
  const categoryOrder = [
    "Core", 
    "Event Management", 
    "Graphic Design", 
    "Web-Ops", 
    "PR & Outreach", 
    "Sponsorship", 
    "Research & Publication", 
    "Content & Documentation", 
    "Social Media"
  ];
  
  // Create a mapping for original-case categories
  const categoryMapping = {};
  categoryOrder.forEach(category => {
    // Create a normalized key (lowercase) to map to the original casing
    categoryMapping[category.toLowerCase()] = category;
  });
  
  // Get unique categories with members count
  const categoriesWithCounts = Object.entries(
    teamMembers.reduce((acc, member) => {
      // Normalize for lookup
      const normalizedCategory = member.category && member.category.toLowerCase();
      
      // Use the original casing from the categoryOrder if available
      const displayCategory = categoryMapping[normalizedCategory] || 
        (member.category && 
         member.category.charAt(0).toUpperCase() + 
         member.category.slice(1).toLowerCase());
      
      if (!acc[displayCategory]) {
        acc[displayCategory] = 0;
      }
      acc[displayCategory]++;
      return acc;
    }, {})
  );

  // Get array of categories for select dropdown
  const categories = [
    { name: "all", label: "All Departments" },
    ...categoriesWithCounts.map(([category, count]) => ({
      name: category,
      label: `${category} (${count})`,
    })),
  ];

  // Group team members by category using the proper casing
  const membersByCategory = teamMembers.reduce((acc, member) => {
    // Normalize for lookup
    const normalizedCategory = member.category && member.category.toLowerCase();
    
    // Use the original casing from the categoryOrder if available
    const displayCategory = categoryMapping[normalizedCategory] || 
      (member.category && 
       member.category.charAt(0).toUpperCase() + 
       member.category.slice(1).toLowerCase());
    
    if (!acc[displayCategory]) {
      acc[displayCategory] = [];
    }
    
    // Only include members that match search query
    if (
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      acc[displayCategory].push(member);
    }
    
    return acc;
  }, {});

  // Sort categories according to specified order
  const sortedCategories = Object.keys(membersByCategory).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    
    // If both categories are in our ordered list, sort by that order
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    // If only one category is in our list, prioritize it
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    
    // For any categories not in our ordered list, sort alphabetically
    return a.localeCompare(b);
  });

  // Effect to handle intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.dataset.category);
            
            // Add subtle animation when section becomes visible
            const section = entry.target;
            section.style.transition = "opacity 0.5s ease-out";
            section.style.opacity = "1";
          }
        });
      },
      { threshold: 0.2, rootMargin: "-50px 0px" }
    );

    document.querySelectorAll(".category-section").forEach((section) => {
      // Reset opacity before observing
      section.style.opacity = "0.92";
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [categoryFilter, searchQuery]);

  // Check if we have any results after filtering
  const hasResults = Object.values(membersByCategory).some(
    (members) => members.length > 0
  );

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search + Filter */}
      <motion.div 
        className="flex flex-col md:flex-row gap-4 mb-10 sticky top-0 z-10 bg-black bg-opacity-90 backdrop-blur-md p-4 rounded-lg border border-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, ease: "easeOut" }}
      >
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
                <option key={cat.name} value={cat.name}>
                  {cat.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* No Results Message */}
      {!hasResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-20 bg-gray-900 bg-opacity-50 rounded-xl"
        >
          <h3 className="text-xl font-bold text-gray-300 mb-2">No team members found</h3>
          <p className="text-gray-400">Try adjusting your search criteria</p>
        </motion.div>
      )}

      <AnimatePresence>
        {/* Members List by Category */}
        {(categoryFilter === "all" ? sortedCategories : [categoryFilter])
          .filter(category => membersByCategory[category]?.length > 0)
          .map((category, idx) => (
            <motion.section
              key={category}
              className="category-section mb-28" // Increased bottom margin for better separation
              data-category={category}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Header with Improved Design */}
              <motion.div 
                className="mb-12 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* First category doesn't need a separator */}
                {idx !== 0 && (
                  <motion.div 
                    className="w-full h-px bg-gradient-to-r from-transparent via-[#ff8c14] to-transparent mb-8 opacity-60"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.6 }}
                    transition={{ delay: 0.1, duration: 1 }}
                  />
                )}
                
                <div className="flex flex-col items-center justify-center py-6 px-4 relative">
                  {/* Title container with cleaner design */}
                  <div className="relative flex flex-col items-center">
                    {/* Subtle decorative elements */}
                    <motion.div
                      className="absolute -left-10 top-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#ff8c14] to-[#ffe808] opacity-40"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                    
                    <motion.div
                      className="absolute -right-10 top-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#ff8c14] to-[#ffe808] opacity-40"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                    
                    {/* Category name - elegant and minimal */}
                    <motion.h2 
                      className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffb700] to-[#ffe808] px-6 py-2 relative z-10"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {category}
                    </motion.h2>
                  </div>
                  
                  {/* Decorative line below text */}
                  <motion.div
                    className="mt-2 h-[2px] bg-gradient-to-r from-transparent via-[#ff8c14] to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: "250px" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
              </motion.div>

              {/* Team Members Grid - Updated with more spacing */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12" // Increased gap for more spacing
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                {membersByCategory[category].map((member, index) => (
                  <TeamMemberCard 
                    key={member.id} 
                    member={{
                      ...member,
                      // Apply the correct case for the category on the member card
                      category: categoryMapping[member.category?.toLowerCase()] || member.category
                    }} 
                    index={index} 
                  />
                ))}
              </motion.div>
            </motion.section>
          ))}
      </AnimatePresence>
    </motion.div>
  );
}

// Team Member Card Component - Reduced size with subtle hover effect
function TeamMemberCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smoother animation
      }}
      whileHover={{ 
        boxShadow: "0 4px 15px -2px rgba(255, 138, 0, 0.15)",
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg overflow-hidden shadow-md max-w-xs mx-auto w-full"
    >
      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 overflow-hidden">
        <div className="absolute w-px h-6 bg-gradient-to-b from-[#ff8c14] to-transparent opacity-60"></div>
        <div className="absolute w-6 h-px bg-gradient-to-r from-[#ff8c14] to-transparent opacity-60"></div>
      </div>
      <div className="absolute top-0 right-0 w-6 h-6 overflow-hidden">
        <div className="absolute right-0 w-px h-6 bg-gradient-to-b from-[#ff8c14] to-transparent opacity-60"></div>
        <div className="absolute w-6 h-px bg-gradient-to-r from-transparent to-[#ff8c14] opacity-60"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-6 h-6 overflow-hidden">
        <div className="absolute bottom-0 w-px h-6 bg-gradient-to-t from-[#ff8c14] to-transparent opacity-60"></div>
        <div className="absolute bottom-0 w-6 h-px bg-gradient-to-r from-[#ff8c14] to-transparent opacity-60"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-px h-6 bg-gradient-to-t from-[#ff8c14] to-transparent opacity-60"></div>
        <div className="absolute bottom-0 w-6 h-px bg-gradient-to-r from-transparent to-[#ff8c14] opacity-60"></div>
      </div>

      {/* Mild hover effect - subtle highlight instead of glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#ff8c14] to-transparent opacity-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.05 }}
        transition={{ duration: 0.3 }}
      />

      {/* Image - Reduced height */}
      <div className="h-56 relative overflow-hidden">
        <motion.img
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          className="object-cover object-top w-full h-full"
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
      </div>

      {/* Content - More compact */}
      <div className="p-3 text-center">
        <motion.h3
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-base font-semibold mb-1 text-white"
        >
          {member.name}
        </motion.h3>
        
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-1 mb-2"
        >
          <p className="text-gray-300 text-xs font-medium">
            {member.position}
          </p>
          <p className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffb700] to-[#ffe808]">
            {member.category}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "40%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-px mx-auto bg-gradient-to-r from-transparent via-[#ff9a00] to-transparent mb-2"
        />
        
        <motion.p
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-xs leading-snug mb-3 line-clamp-2"
        >
          {member.bio}
        </motion.p>

        <motion.div
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center space-x-3"
        >
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#ff9a00] transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              <Linkedin className="h-4 w-4" />
            </motion.a>
          )}
          {member.github && (
            <motion.a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#ff9a00] transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              <Github className="h-4 w-4" />
            </motion.a>
          )}
          {member.email && (
            <motion.a
              href={`mailto:${member.email}`}
              className="text-gray-400 hover:text-[#ff9a00] transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              <Mail className="h-4 w-4" />
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}