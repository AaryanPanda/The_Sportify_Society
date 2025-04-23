import { useEffect, useRef } from "react";
import { Button } from "../ui/buttons";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import logo from "../assets/sportify_logo1.png";
import { Link } from "react-router-dom";


export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      {/* Flame Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[
          { top: "33%", left: "25%" },
          { top: "50%", right: "33%" },
          { bottom: "25%", left: "13%" },
          { top: "25%", right: "20%" },
          { bottom: "20%", right: "15%" },
        ].map((pos, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 rounded-full animate-flicker"
            style={{
              backgroundColor: [
                "#ffce00",
                "#ff5a00",
                "#ff9a00",
                "#ffe808",
                "#ff0000",
              ][index],
              opacity: 0.6,
              ...pos,
            }}
          />
        ))}
      </div>

      {/* Floating Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 animate-float mb-8"
      >
        <div className="w-40 h-40 md:w-56 md:h-56">
          <img
            src={logo}
            alt="Sportify Logo"
            className="object-contain w-full h-full"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* Central Text & CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Spreading the{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300">
            Flame of Sports
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Join IIT Madras BS Degree Sports Society and be part of a community
          that celebrates athleticism, teamwork, and the undying spirit of
          competition.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300 text-black font-semibold hover:brightness-110 hover:shadow-yellow-300/40 focus:outline-none transition-all transform active:scale-95 flex items-center space-x-2"
          >
            <Flame className="h-5 w-5" />
            <span>Join Sportify</span>
          </Button>

          <div className="p-[2px] rounded-md bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 inline-block">
          <Link to="/upcoming-events" className="w-full h-full">
  <Button
    size="lg"
    className="bg-black text-amber-500 font-semibold w-full h-full
               hover:brightness-110 hover:shadow-yellow-300/40 
               focus:outline-none active:outline-none 
               transform active:scale-95
               rounded-md transition-colors duration-200"
  >
    Explore Events
  </Button>
</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
