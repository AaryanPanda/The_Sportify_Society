// src/lib/data.js

export const upcomingEvents = [
    {
      id: "event-1",
      title: "Annual Cricket Tournament",
      date: "May 15, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "IIT Madras Cricket Ground",
      category: "Cricket",
      description:
        "Join us for our annual cricket tournament featuring teams from various departments. Compete for the prestigious Sportify Cricket Trophy and showcase your cricketing skills.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "event-2",
      title: "Basketball Championship",
      date: "June 5, 2025",
      time: "2:00 PM - 8:00 PM",
      location: "IIT Madras Sports Complex",
      category: "Basketball",
      description:
        "The most anticipated basketball event of the year is here! Teams will compete in a knockout tournament to determine the campus champions.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "event-3",
      title: "Football League Kickoff",
      date: "June 20, 2025",
      time: "4:00 PM - 7:00 PM",
      location: "IIT Madras Football Field",
      category: "Football",
      description:
        "The Sportify Football League is back! Join us for the kickoff event and witness exciting matches between departmental teams.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "event-4",
      title: "Tennis Tournament",
      date: "July 10, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "IIT Madras Tennis Courts",
      category: "Tennis",
      description:
        "Show off your tennis skills in singles and doubles matches. Open to all skill levels with separate categories for beginners and advanced players.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "event-5",
      title: "Athletics Meet",
      date: "August 5, 2025",
      time: "8:00 AM - 6:00 PM",
      location: "IIT Madras Athletics Track",
      category: "Athletics",
      description:
        "A day full of track and field events including sprints, long-distance running, high jump, long jump, and more. Come participate or cheer for your friends!",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "event-6",
      title: "Badminton Championship",
      date: "August 20, 2025",
      time: "9:00 AM - 7:00 PM",
      location: "IIT Madras Indoor Stadium",
      category: "Badminton",
      description:
        "The annual badminton championship featuring singles and doubles categories. Register now to participate in this exciting event!",
      image: "/placeholder.svg?height=400&width=600",
    },
  ];
  
  export const pastEvents = [
    {
      id: "past-event-1",
      title: "Inter-Department Cricket Tournament 2024",
      date: "March 10, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "IIT Madras Cricket Ground",
      category: "Cricket",
      description:
        "The Computer Science department emerged victorious in the closely contested final against the Electrical Engineering department. The tournament saw participation from 12 departments.",
      image: "/placeholder.svg?height=400&width=600",
      isPast: true,
      tags: ["Cricket", "Tournament", "Inter-Department"],
    },
    {
      id: "past-event-2",
      title: "Annual Sports Day 2024",
      date: "February 15, 2024",
      time: "8:00 AM - 8:00 PM",
      location: "IIT Madras Sports Complex",
      category: "Multi-sport",
      description:
        "A day filled with various sporting events including athletics, swimming, and team sports. The event was a huge success with over 500 participants from across the campus.",
      image: "/placeholder.svg?height=400&width=600",
      isPast: true,
      tags: ["Sports Day", "Athletics", "Swimming", "Annual Event"],
    },
    {
      id: "past-event-3",
      title: "Basketball Tournament 2023",
      date: "November 20, 2023",
      time: "2:00 PM - 8:00 PM",
      location: "IIT Madras Basketball Court",
      category: "Basketball",
      description:
        "The Mechanical Engineering team won the basketball tournament after an intense final match that went into overtime. The tournament featured 8 teams competing in a knockout format.",
      image: "/placeholder.svg?height=400&width=600",
      isPast: true,
      tags: ["Basketball", "Tournament", "Knockout"],
    },
    {
      id: "past-event-4",
      title: "Football League 2023",
      date: "October 5-25, 2023",
      time: "Various timings",
      location: "IIT Madras Football Field",
      category: "Football",
      description:
        "The month-long football league saw 10 teams competing in a round-robin format. The Civil Engineering department emerged as champions with an unbeaten record.",
      image: "/placeholder.svg?height=400&width=600",
      isPast: true,
      tags: ["Football", "League", "Round-Robin"],
    },
  ];
  
  export const teamMembers = [
    {
      id: "member-1",
      name: "Rahul Sharma",
      position: "President",
      bio: "Rahul is a final year Computer Science student with a passion for cricket and football. He has been leading Sportify since 2023.",
      image: "/placeholder.svg?height=400&width=400",
      linkedin: "https://linkedin.com",
      email: "rahul@sportify.org",
    },
    {
      id: "member-2",
      name: "Priya Patel",
      position: "Vice President",
      bio: "Priya is a third-year Mechanical Engineering student and a national level basketball player. She oversees all sporting events at Sportify.",
      image: "/placeholder.svg?height=400&width=400",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "priya@sportify.org",
    },
    {
      id: "member-3",
      name: "Arjun Nair",
      position: "Secretary",
      bio: "Arjun is a second-year Electrical Engineering student with a keen interest in tennis and athletics. He handles all administrative tasks for Sportify.",
      image: "/placeholder.svg?height=400&width=400",
      linkedin: "https://linkedin.com",
      email: "arjun@sportify.org",
    },
    {
      id: "member-4",
      name: "Sneha Reddy",
      position: "Treasurer",
      bio: "Sneha is a third-year Economics student who manages the finances for all Sportify events. She is also an avid badminton player.",
      image: "/placeholder.svg?height=400&width=400",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "sneha@sportify.org",
    },
    {
      id: "member-5",
      name: "Vikram Singh",
      position: "Event Coordinator",
      bio: "Vikram is a second-year Physics student responsible for planning and executing all Sportify events. He is a football enthusiast.",
      image: "/placeholder.svg?height=400&width=400",
      linkedin: "https://linkedin.com",
      email: "vikram@sportify.org",
    },
    {
      id: "member-6",
      name: "Ananya Desai",
      position: "Marketing Head",
      bio: "Ananya is a final year Media Studies student who handles all promotional activities for Sportify. She is also a skilled swimmer.",
      image: "/placeholder.svg?height=400&width=400",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "ananya@sportify.org",
    },
    {
      id: "member-7",
      name: "Karthik Menon",
      position: "Technical Lead",
      bio: "Karthik is a third-year Computer Science student who manages the website and technical aspects of Sportify. He enjoys playing cricket and chess.",
      image: "/placeholder.svg?height=400&width=400",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "karthik@sportify.org",
    },
    {
      id: "member-8",
      name: "Meera Joshi",
      position: "Content Creator",
      bio: "Meera is a second-year Journalism student who creates content for Sportify's social media channels. She is passionate about basketball.",
      image: "/placeholder.svg?height=400&width=400",
      linkedin: "https://linkedin.com",
      email: "meera@sportify.org",
    },
  ];
  
  
export const getFAQs = () => [
  {
    question: "How can I register for events?",
    answer: "You can register for events by visiting the event page and clicking the 'Register' button."
  },
  {
    question: "How do I become a member?",
    answer: "You can join by signing up on our membership page, where you'll need to provide your details."
  },
  {
    question: "What types of events do you host?",
    answer: "We host various events including competitions, training sessions, and social meetups."
  },
  {
    question: "Can I sponsor an event?",
    answer: "Yes, you can sponsor our events. Please contact us via the contact form for more details."
  },
  {
    question: "What is the refund policy?",
    answer: "We offer a full refund if you cancel your registration at least 7 days before the event."
  },
];
