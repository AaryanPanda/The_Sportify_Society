// src/Home.jsx

import Navbar from '../components/navbar'
import Hero from '../components/hero'
import UpcomingEvents from '../components/upcomingEvents'
import PastEvents from '../components/pastEvents'
import Team from '../components/team'
import Footer from '../components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950">
      <Navbar />
      <Hero />
      <UpcomingEvents />
      <PastEvents />
      <Team />
      <Footer />
    </main>
  )
}
