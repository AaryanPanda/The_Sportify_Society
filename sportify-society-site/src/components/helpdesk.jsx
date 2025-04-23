import { getFAQs } from "../lib/data"; // Fetch FAQs
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";

export default function Helpdesk() {
  const faqs = getFAQs(); // Retrieve FAQs from data.js
  const sectionRef = useRef(null);

  // Adding the extra FAQ item for "What to do if I don't find my answer?"
  const additionalFAQ = {
    question: "What should I do if I don't find my answer in the FAQ?",
    answer: "If you couldn't find the information you were looking for in the FAQ, don't worry! You can contact our team directly for assistance:\n\n• Phone: +123 456 7890 (John Doe - Support)\n• Email: support@ourclub.com\n• Phone: +987 654 3210 (Jane Smith - Help Desk)\n• Email: help@ourclub.com\n\nFeel free to reach out during our business hours (Mon-Fri, 9 AM - 6 PM). We are here to assist you!"
  };

  // Add the additional FAQ item to the existing FAQs
  const updatedFAQs = [...faqs, additionalFAQ];

  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);

  // Toggle FAQ open/close
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Animation for scroll reveal
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
      className="py-12 bg-gradient-to-br from-black via-[#1a1a1a] to-black"
      id="helpdesk"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 scroll-reveal">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400">
              Questions
            </span>
          </h1>
          <p className="mt-10 text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our events, membership, and more. If you can't find what you're looking for, we are here to help!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 border-gradient rounded-lg shadow-xl bg-gradient-to-br from-black to-[#151515] text-white">
            <CardContent className="py-6 px-4 md:px-6">
              <div className="space-y-4">
                {updatedFAQs.map((faq, index) => (
                  <div key={index} className="border border-gray-800 rounded-md overflow-hidden scroll-reveal hover:shadow-xl transition-shadow duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                    <div 
                      className="flex justify-between items-center p-4 bg-gradient-to-r from-[#111] to-[#222] cursor-pointer"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="font-medium text-gray-100">{faq.question}</h3>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-xl font-bold">
                        {openFAQ === index ? "−" : "+"}
                      </span>
                    </div>
                    {openFAQ === index && (
                      <div className="p-5 bg-gradient-to-br from-[#1a1a1a] to-[#212121] text-gray-300 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CSS for gradient border */}
      <style jsx>{`
        .border-gradient {
          position: relative;
        }
        .border-gradient::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(to right, #ff4500, #ff6a00, #ffce00);
          border-radius: 0.5rem;
          z-index: -1;
        }
      `}</style>
    </section>
  );
}