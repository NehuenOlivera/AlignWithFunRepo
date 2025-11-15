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
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("get_events_with_spots");
      if (error) {
        console.error("Supabase RPC error:", error);
        return;
      }
      if (!error) setEvents((data as Event[]) || []);
      setLoading(false);
    }
    load();

    const channel = supabase
      .channel("attendees-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "attendees" },
        () => load()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleJoinSubmit = async () => {
    if (!selectedEvent) return;

    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: selectedEvent.id }),
    });

    const data = await res.json();

    if (data.error) setMessage("Error: " + data.error);
    else setMessage(data.message || "Successfully joined!");
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
        <UpcomingClasses
          events={events}
          loading={loading}
          onJoin={setSelectedEvent}
        />
      </section>

      {selectedEvent && (
        <JoinModal
          event={selectedEvent}
          message={message}
          handleSubmit={handleJoinSubmit}
          handleClose={handleCloseModal}
        />
      )}
    </main>
  );
}
