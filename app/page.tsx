"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Hero from "../components/Hero";
import UpcomingClasses from "../components/UpcomingClasses";
import JoinModal from "../components/JoinModal";
import { Event } from "../types";

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_cancelled", false)
        .gte("start_at", new Date().toISOString())
        .order("start_at", { ascending: true });
      if (error) console.error(error);
      setEvents((data as Event[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: selectedEvent.id,
          name,
          email,
          phone,
        }),
      });
      const data = await res.json();
      if (data.error) setMessage("Error: " + data.error);
      else setMessage(data.message || "Successfully joined!");
      setName(""); setEmail(""); setPhone("");
    } catch {
      setMessage("Unexpected error joining event.");
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Hero />
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Upcoming Classes</h2>
        <UpcomingClasses events={events} loading={loading} onJoin={setSelectedEvent} />
      </section>
      {selectedEvent && (
        <JoinModal
          event={selectedEvent}
          name={name}
          email={email}
          phone={phone}
          message={message}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          handleSubmit={handleJoinSubmit}
          handleClose={handleCloseModal}
        />
      )}
    </main>
  );
}
