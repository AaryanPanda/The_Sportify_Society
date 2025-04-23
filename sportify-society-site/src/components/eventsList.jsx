import { Link } from "react-router-dom";
import { Button } from "../ui/buttons";
import { Card, CardContent } from "../ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function EventsList({ events }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {events.map((event) => (
        <Card
          key={event.id}
          className="overflow-hidden transition-all duration-300 ease-in-out border border-gray-800 rounded-lg bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-black hover:bg-gradient-to-bl shadow-md hover:shadow-xl"
        >
          {/* Image and Category */}
          <div className="h-36 bg-gray-200 dark:bg-gray-800 relative overflow-hidden rounded-t-lg">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out"
            />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ff7f50] to-[#ffb84d] text-[#333333] border-2 border-[#333333] px-4 py-1 rounded-full text-sm font-medium shadow-lg">
              {event.category}
            </div>
          </div>

          {/* Card Content */}
          <CardContent className="p-4">
            <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-400 dark:text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.date}</span>
              </div>
              <div className="flex items-center text-gray-400 dark:text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.time}</span>
              </div>
              <div className="flex items-center text-gray-400 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.location}</span>
              </div>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-4 line-clamp-3">
              {event.description}
            </p>

            {/* Register or View Details Button */}
            {event.isPast ? (
              <Link to={`/past-events/${event.id}`}>
                <Button
                  variant="outline"
                  className="w-full border-[#ff9a00] text-[#ff9a00] hover:bg-[#ff9a00]/20 transition-colors duration-200 ease-in-out"
                >
                  View Details
                </Button>
              </Link>
            ) : (
              <Button className="w-full flex items-center justify-center bg-gradient-to-r from-[#ff4500]/30 via-[#ff6a00]/40 to-[#ffce00]/50 hover:from-[#ff4500]/40 hover:via-[#ff6a00]/50 hover:to-[#ffce00]/60 text-white py-3 px-6 rounded-lg transition-all duration-300">
                Register Now
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
