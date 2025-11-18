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
    <main className="min-h-screen">
      <Hero />

      <section className="py-16 px-6 mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5ece5] !mb-4 justify-center flex">
            Upcoming Classes
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-[#f5ece5]/70">Loading your classes...</div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#f5ece5]/70">
              No upcoming classes available at the moment.
            </p>
          </div>
        ) : (
          <UpcomingClasses
            events={events}
            loading={loading}
            onJoin={setSelectedEvent}
          />
        )}
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
