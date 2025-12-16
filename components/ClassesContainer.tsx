"use client";

import { useCallback, useEffect, useState } from "react";
import JoinModal from "./JoinModal";
import UpcomingClasses from "./UpcomingClasses";
import { createClient } from "@/utils/supabase/client";
import { Event } from "@/types";
import CancelBookingModal from "./CancelBookingModal";

export default function ClassesContent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventToJoin, setEventToJoin] = useState<Event | null>(null);
  const [eventToCancel, setEventToCancel] = useState<Event | null>(null);
  const [message, setMessage] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const supabase = createClient();

  const loadEvents = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const userId = session?.user?.id ?? null;
    setIsLogged(userId !== null);

    const { data, error } = await supabase.rpc("get_events_with_spots", {
      p_user_id: userId,
    });

    if (!error) setEvents((data as Event[]) || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    if (!eventToJoin) return;

    // Validate if user is joining for the first time or it was cancelled and is trying to join again.
    const resp = await fetch(`/api/join?event_id=${eventToJoin.id}`);
    const payload = await resp.json();
    const isCancelled =
      payload && typeof payload.cancelled === "boolean"
        ? payload.cancelled
        : false;

    const method = isCancelled ? "PUT" : "POST";

    const res = await fetch("/api/join", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventToJoin.id }),
    });

    const data = await res.json();
    setMessage(data.error ? "Error: " + data.error : data.message);

    await loadEvents();
  };

  const handleCancelBooking = async () => {
    if (!eventToCancel) return;

    const res = await fetch("/api/cancelBooking", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventToCancel.id }),
    });

    const data = await res.json();
    setMessage(data.error ? "Error: " + data.error : data.message);

    await loadEvents();
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-[#0a1f12] to-[#101010]">
      <section className="py-8 px-6 mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f5ece5] mb-4! justify-center flex">
            Upcoming Classes
          </h1>
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
            onJoin={setEventToJoin}
            onCancelBooking={setEventToCancel}
          />
        )}
      </section>

      {eventToJoin && (
        <JoinModal
          event={eventToJoin}
          message={message}
          isLoggedIn={isLogged}
          handleSubmit={handleJoinSubmit}
          handleClose={() => {
            setEventToJoin(null);
            setMessage("");
          }}
        />
      )}

      {eventToCancel && (
        <CancelBookingModal
          event={eventToCancel}
          message={message}
          handleSubmit={handleCancelBooking}
          handleClose={() => {
            setEventToCancel(null);
            setMessage("");
          }}
        />
      )}
    </main>
  );
}
