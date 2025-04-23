// src/components/Footer.jsx

import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../assets/sportify_logo1.png'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Logo & About */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src={logo}
                alt="Sportify Logo"
                width={50}
                height={50}
                className="mr-3 drop-shadow-md"
              />
              <h3 className="text-2xl font-extrabold tracking-wide  text-[#f8f8f8]">
                THE Sportify
              </h3>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              IIT Madras BS Degree Sports Society — spreading the joy of sports and fostering a community of athletes.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-gray-500 hover:text-white transition-colors hover:scale-110 duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#ff5a00] to-[#ffce00] text-transparent bg-clip-text">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ['/', 'Home'],
                ['/upcoming-events', 'Upcoming Events'],
                ['/past-events', 'Past Events'],
                ['/team', 'Our Team'],
                ['/helpdesk', 'Helpdesk']
              ].map(([url, label], idx) => (
                <li key={idx}>
                  <Link
                    to={url}
                    className="text-gray-400 hover:text-[#ff9a00] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#ff0000] to-[#ffe808] text-transparent bg-clip-text">
              Sports Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {['Cricket', 'Football', 'Basketball', 'Tennis', 'Athletics'].map((sport, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-[#ff9a00] transition-colors"
                  >
                    {sport}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#ff5a00] via-[#ff9a00] to-[#ffe808] text-transparent bg-clip-text">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-[#ff9a00] mt-0.5" />
                <span>IIT Madras Campus, Chennai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#ff9a00]" />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#ff9a00]" />
                <span>contact@sportify.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">
            © {currentYear} <span className="text-white font-semibold">THE Sportify</span>. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
              <Link
                key={i}
                to="#"
                className="hover:text-[#ff9a00] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
