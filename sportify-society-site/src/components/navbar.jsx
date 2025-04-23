import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "../ui/buttons";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import logo from "../assets/sportify_logo1.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Upcoming Events", path: "/upcoming-events" },
  { name: "Past Events", path: "/past-events" },
  { name: "Team", path: "/team" },
  { name: "Helpdesk", path: "/helpdesk" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 
             outline-none ring-0 focus:outline-none focus:ring-0 
             active:outline-none active:ring-0 
             focus-visible:outline-none focus-visible:ring-0"
          >
            <img
              src={logo}
              alt="Sportify Logo"
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <span className="font-bold text-xl md:text-2xl text-white">
              THE Sportify
            </span>
          </Link>

          {/* Desktop Navigation shifted to the right */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  // style={{ outline: 'none', border: 'none' }}
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-200 relative group focus:outline-none active:outline-none active:ring-0 ${
                    pathname === link.path
                      ? "text-transparent bg-clip-text bg-[linear-gradient(90deg,#ff0000,#ff5a00,#ff9a00,#ffce00,#ffe808)]"
                      : "text-white hover:text-orange-400"
                  }`}
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black text-white">
                <div className="flex flex-col space-y-6 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-lg font-medium transition-all duration-300 ${
                        pathname === link.path
                          ? "text-transparent bg-clip-text bg-[linear-gradient(90deg,#ff0000,#ff5a00,#ff9a00,#ffce00,#ffe808)]"
                          : "text-white hover:text-orange-400"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
