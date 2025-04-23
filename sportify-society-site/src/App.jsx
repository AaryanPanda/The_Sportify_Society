import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import UpcomingEvents from "./pages/upcomingEvents";
import PastEvents from "./pages/pastEvents";
import Team from "./pages/team";
import Helpdesk from "./pages/helpdesk";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/past-events" element={<PastEvents />} />
        <Route path="/team" element={<Team />} />
        <Route path="/helpdesk" element={<Helpdesk />} />
      </Routes>
    </>
  );
}

export default App;