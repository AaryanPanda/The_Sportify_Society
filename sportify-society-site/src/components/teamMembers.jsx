import { useState, useEffect, useRef } from "react";
import { teamMembers } from "../lib/data";
import { Github, Linkedin, Mail, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

export default function TeamMembersCarousel() {
  // Updated category order - split Core into Founders and Secretaries
  const categoryOrder = [
    "Founders", 
    "Secretaries", 
    "Event Management", 
    "Graphic Design", 
    "Web-Ops", 
    "PR & Outreach", 
    "Sponsorship", 
    "Research & Publication", 
    "Content & Documentation", 
    "Social Media"
  ];
  
  // Create normalized category mapping
  const categoryMapping = {};
  categoryOrder.forEach(category => {
    categoryMapping[category.toLowerCase()] = category;
  });
  
  // Special mapping for Core members to Founders or Secretaries
  const coreMapping = (member) => {
    return member.category;
  };
  
  // State for active category and active member index
  const [activeCategory, setActiveCategory] = useState(categoryOrder[0]);
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  
  const carouselRef = useRef(null);
  const categoryNavRef = useRef(null);
  const containerRef = useRef(null);
  
  // Filter members by active category
  const filteredMembers = teamMembers.filter(member => {
    const mappedCategory = coreMapping(member);
    const normalizedCategory = mappedCategory && mappedCategory.toLowerCase();
    const displayCategory = categoryMapping[normalizedCategory] || 
      (mappedCategory && 
      mappedCategory.charAt(0).toUpperCase() + 
      mappedCategory.slice(1).toLowerCase());
    
    return displayCategory === activeCategory;
  });
  
  // Reset active member index when category changes
  useEffect(() => {
    setActiveMemberIndex(0);
    // Close mobile menu when category changes
    setIsMobileMenuOpen(false);
  }, [activeCategory]);
  
  // Handle scroll events for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      
      // Calculate parallax effect based on scroll position relative to container
      if (scrollTop > containerTop - window.innerHeight && scrollTop < containerTop + containerHeight) {
        const relativePosition = scrollTop - (containerTop - window.innerHeight);
        const parallaxValue = relativePosition * 0.1; // Adjust speed factor as needed
        setParallaxOffset(parallaxValue);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Scroll active category into view when it changes
  useEffect(() => {
    if (categoryNavRef.current) {
      const activeButton = categoryNavRef.current.querySelector(".active-category");
      if (activeButton) {
        const navScroll = categoryNavRef.current;
        const buttonRect = activeButton.getBoundingClientRect();
        const navRect = navScroll.getBoundingClientRect();
        
        // Calculate scroll position to center the button
        const scrollLeft = activeButton.offsetLeft - navScroll.offsetLeft - 
          (navRect.width / 2) + (buttonRect.width / 2);
        
        navScroll.scrollTo({
          left: scrollLeft,
          behavior: "smooth"
        });
      }
    }
  }, [activeCategory]);
  
  // Navigation functions with transition state
  const nextMember = () => {
    if (isTransitioning || activeMemberIndex === filteredMembers.length - 1) return;
    
    setIsTransitioning(true);
    setActiveMemberIndex(prevIndex => prevIndex + 1);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  const prevMember = () => {
    if (isTransitioning || activeMemberIndex === 0) return;
    
    setIsTransitioning(true);
    setActiveMemberIndex(prevIndex => prevIndex - 1);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  // Function to select a specific member
  const selectMember = (index) => {
    if (isTransitioning || index === activeMemberIndex) return;
    
    setIsTransitioning(true);
    setActiveMemberIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  // Calculate indices for carousel items
  const getCarouselIndices = () => {
    const total = filteredMembers.length;
    
    // For mobile view, show fewer items
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const visibleItems = isMobile ? 1 : 3;
    
    if (total <= visibleItems) return Array.from({ length: total }, (_, i) => i);
    
    // Show only visibleItems with active in the middle
    const indices = [];
    const halfVisible = Math.floor(visibleItems / 2);
    
    for (let i = -halfVisible; i <= halfVisible; i++) {
      // Handle cases where we're at the edges
      if (activeMemberIndex + i < 0 || activeMemberIndex + i >= total) continue;
      indices.push(activeMemberIndex + i);
    }
    
    // Add extra items for mobile if needed to maintain visibleItems
    if (indices.length < visibleItems && total >= visibleItems) {
      if (activeMemberIndex === 0) {
        // At the start, add more from the right
        for (let i = indices.length; i < visibleItems; i++) {
          if (activeMemberIndex + i < total) {
            indices.push(activeMemberIndex + i);
          }
        }
      } else if (activeMemberIndex === total - 1) {
        // At the end, add more from the left
        for (let i = indices.length; i < visibleItems; i++) {
          if (activeMemberIndex - i >= 0) {
            indices.unshift(activeMemberIndex - i);
          }
        }
      }
    }
    
    return indices;
  };
  
  // Check if carousel is at start or end
  const isFirstMember = activeMemberIndex === 0;
  const isLastMember = activeMemberIndex === filteredMembers.length - 1;
  
  // Get active member
  const activeMember = filteredMembers[activeMemberIndex] || {};
  
  return (
    <div ref={containerRef} className="w-full min-h-screen flex flex-col bg-black pt-8 md:pt-10 mb-8">
      {/* Department Navigation Bar - Now positioned relative to container, not fixed */}
      <div className="w-full border-b border-gray-800 py-2 shadow-lg bg-black/90 backdrop-blur-md">
        <div className="container mx-auto px-4">
          {/* Mobile toggle button - Improved styling */}
          <div className="md:hidden flex justify-between items-center py-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 border border-gray-700 rounded-lg flex items-center"
              aria-label="Toggle category menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              <span className="ml-2 text-sm font-medium">{isMobileMenuOpen ? "Close" : "Categories"}</span>
            </button>
            
            <span className="text-white font-bold text-sm bg-gradient-to-r from-[#ff5a00] to-[#ffb700] bg-clip-text text-transparent">
              {activeCategory}
            </span>
          </div>
          
          {/* Mobile dropdown menu - Enhanced styling */}
          <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
            <div className="py-2 bg-gray-900 rounded-lg shadow-xl my-2 max-h-80 overflow-y-auto border border-gray-800">
              {categoryOrder.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-[#ff5a00] to-[#ffb700] text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Desktop horizontal scrolling categories */}
          <div 
            ref={categoryNavRef}
            className={`hidden md:flex items-center justify-center overflow-x-auto py-2 scrollbar-hide`}
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none" 
            }}
          >
            <div className="flex items-center justify-start space-x-1 md:space-x-2 px-1">
              {categoryOrder.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 relative ${
                    activeCategory === category
                      ? "active-category bg-gradient-to-r from-[#ff5a00] to-[#ffb700] text-white shadow-lg shadow-orange-900/30 scale-105"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {activeCategory === category && (
                    <span className="absolute inset-0 rounded-lg bg-white/10 animate-pulse"></span>
                  )}
                  <span className="relative z-10">{category}</span>
                  
                  {/* Underline indicator for active category */}
                  {activeCategory === category && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff5a00] to-[#ffb700]"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content: Carousel + Details - with parallax effect */}
      <div 
        className="flex-1 flex flex-col items-center justify-center relative overflow-hidden py-6"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        {/* Category Title with parallax counter-effect for depth */}
        <div 
          className="w-full text-center"
          style={{
            transform: `translateY(${-parallaxOffset * 0.3}px)`,
            transition: "transform 0.1s ease-out"
          }}
        >
          <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffb700] to-[#ffe808]">
            {activeCategory} Team
          </p>
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#ff8c14] to-transparent mt-2" />
        </div>
      
        {/* Carousel Section - Simplified container with proper positioning */}
        <div className="w-full relative" style={{ height: "min(70vh, 480px)" }}>
          {/* Navigation Arrows - Adjusted for mobile */}
          {!isFirstMember && (
            <button 
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 sm:p-3 rounded-full text-white hover:bg-black/90 transition-all hover:scale-110 border border-gray-800 hover:border-[#ff8c14]"
              onClick={prevMember}
              disabled={isTransitioning}
              aria-label="Previous team member"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          
          {!isLastMember && (
            <button 
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 sm:p-3 rounded-full text-white hover:bg-black/90 transition-all hover:scale-110 border border-gray-800 hover:border-[#ff8c14]"
              onClick={nextMember}
              disabled={isTransitioning}
              aria-label="Next team member"
            >
              <ChevronRight size={20} />
            </button>
          )}
          
          {/* Simplified carousel background - single, subtle gradient */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-gray-800/20 to-black/0"></div>
          </div>
          
          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="absolute w-full h-full flex items-center justify-center"
            style={{
              transform: `translateY(${-parallaxOffset * 0.05}px)`,
              transition: "transform 0.1s ease-out"
            }}
          >
            {filteredMembers.length > 0 ? (
              getCarouselIndices().map((index) => {
                const member = filteredMembers[index];
                const isActive = index === activeMemberIndex;
                
                // Calculate position based on difference from active
                const diff = index - activeMemberIndex;
                
                // Adjust transforms for mobile vs desktop
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                const translateX = isMobile 
                  ? diff * 220  // Smaller spacing for mobile
                  : diff * 280; // Original spacing for desktop
                  
                const scale = isActive ? (isMobile ? 1 : 1.1) : (isMobile ? 0.8 : 0.7);
                const zIndex = isActive ? 10 : 5 - Math.abs(diff);
                const opacity = isActive ? 1 : Math.abs(diff) === 1 ? 0.5 : 0;
                
                // Don't render items that are too far away
                if (isMobile && Math.abs(diff) > 0) return null;
                if (!isMobile && Math.abs(diff) > 1) return null;
                
                return (
                  <div
                    key={member.id}
                    onClick={() => selectMember(index)}
                    className={`absolute cursor-pointer transition-all mb-10 duration-500 ease-out transform-gpu`}
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      zIndex,
                      opacity
                    }}
                  >
                    <div 
                      className={`rounded-xl overflow-hidden ${
                        isActive ? 'shadow-2xl shadow-orange-900/30' : 'shadow-lg'
                      }`}
                      style={{ 
                        width: isActive 
                          ? (isMobile ? '220px' : '260px') 
                          : (isMobile ? '180px' : '220px') 
                      }}
                    >
                      {/* Image container - reduced heights and responsive */}
                      <div 
                        className="relative"
                        style={{ 
                          height: isActive 
                            ? (isMobile ? '320px' : '360px') 
                            : (isMobile ? '280px' : '320px') 
                        }}
                      >
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                        
                        {/* Simplified gradient overlay - more subtle */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        
                        {/* Active state indicators - simplified */}
                        {isActive && (
                          <div className="absolute inset-0 ring-1 ring-[#ff8c14] ring-opacity-60 rounded-xl"></div>
                        )}
                        
                        {/* Bottom info panel - simplified styling */}
                        <div 
                          className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-center transition-all duration-500 ${
                            isActive ? 'bg-gradient-to-t from-black via-black/90 to-transparent pt-10 sm:pt-12' : 'bg-black/80'
                          }`}
                        >
                          <h3 className={`font-bold text-white transition-all duration-300 ${
                            isActive ? 'text-lg sm:text-xl mb-1' : 'text-sm sm:text-base mb-0.5'
                          }`}>
                            {member.name}
                          </h3>
                          
                          <p className={`font-medium transition-all duration-300 ${
                            isActive ? 'text-gray-200 text-xs sm:text-sm' : 'text-gray-400 text-xs'
                          }`}>
                            {member.position}
                          </p>
                          
                          {/* Social links - only shown for active */}
                          {isActive && (
                            <div className="flex justify-center space-x-4 mt-2 sm:mt-3">
                              {member.linkedin && (
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-300 hover:text-[#ff9a00] transition-all duration-200 hover:scale-125"
                                  aria-label={`${member.name}'s LinkedIn`}
                                >
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              )}
                              {member.github && (
                                <a
                                  href={member.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-300 hover:text-[#ff9a00] transition-all duration-200 hover:scale-125"
                                  aria-label={`${member.name}'s GitHub`}
                                >
                                  <Github className="h-4 w-4" />
                                </a>
                              )}
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="text-gray-300 hover:text-[#ff9a00] transition-all duration-200 hover:scale-125"
                                  aria-label={`Email ${member.name}`}
                                >
                                  <Mail className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-400 bg-gray-900/50 p-6 rounded-xl">
                No team members found in this category
              </div>
            )}
          </div>
        </div>
        
        {/* Carousel Indicators - Redesigned and responsive */}
        {filteredMembers.length > 0 && (
          <div 
            className="flex justify-center mt-6 sm:mt-8 space-x-1.5 sm:space-x-2"
            style={{
              transform: `translateY(${-parallaxOffset * 0.15}px)`,
              transition: "transform 0.1s ease-out"
            }}
          >
            {filteredMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => selectMember(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeMemberIndex
                    ? "bg-gradient-to-r from-[#ff5a00] to-[#ffb700] w-5 sm:w-6 h-1.5"
                    : "bg-gray-700 w-2 sm:w-2.5 h-1.5 hover:bg-gray-500"
                }`}
                aria-label={`View team member ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Custom CSS to hide scrollbars */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Add smooth scrolling to the whole document */
        html {
          scroll-behavior: smooth;
        }
        
        /* Add radial gradient support */
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
        
        /* Improve touch handling for mobile */
        @media (max-width: 640px) {
          .transform-gpu {
            will-change: transform;
            transform: translateZ(0);
          }
        }
      `}</style>
    </div>
  );
}