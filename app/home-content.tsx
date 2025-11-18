"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import Hero from "../components/Hero";
import UpcomingClasses from "../components/UpcomingClasses";
import JoinModal from "../components/JoinModal";
import { Event } from "../types";

export default function HomeContent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const loadEvents = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const userId = session?.user?.id ?? null;

    const { data, error } = await supabase.rpc("get_events_with_spots", {
      p_user_id: userId,
    });

    if (!error) setEvents((data as Event[]) || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    (async () => {
      await loadEvents();
    })();

    const channel = supabase
      .channel("attendees-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "attendees" },
        () => loadEvents()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadEvents, supabase]);

  const handleJoinSubmit = async () => {
    if (!selectedEvent) return;

    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: selectedEvent.id }),
    });

    const data = await res.json();
    setMessage(data.error ? "Error: " + data.error : data.message);

    await loadEvents();
  };

  return (
    <main className="min-h-screen font-sans text-black">
      <Hero />

      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Upcoming Classes</h2>

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
          handleClose={() => {
            setSelectedEvent(null);
            setMessage("");
          }}
        />
      )}
    </main>
  );
}
