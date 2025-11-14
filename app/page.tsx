"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { formatDistanceToNow, format } from "date-fns";

type Event = {
  id: string;
  name: string;
  description: string | null;
  start_at: string;
  duration_minutes: number;
  max_participants: number;
  suggested_price: number | null;
  post_schedule_message: string | null;
  booked_count: number;
};

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
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

      if (error) console.error("Supabase error:", error);
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
      if (data.error) {
        setMessage("Error: " + data.error);
      } else {
        setMessage(data.message || "Successfully joined!");
        setName("");
        setEmail("");
        setPhone("");
      }
    } catch {
      setMessage("Unexpected error joining event.");
    }
  };

  const handleCloseForm = () => {
    setSelectedEvent(null);
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      {/* Hero */}
      <section className="bg-white py-12 px-6 text-center shadow-sm">
        <img
          src="https://xtprzolahofaihkihtby.supabase.co/storage/v1/object/sign/Images/Foto%20CV.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yMjE5YmQyMy03NDlkLTRlZjItOTEyZi1jZjRmMWVlZTIxNTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvRm90byBDVi5qcGVnIiwiaWF0IjoxNzYzMTE3MzA3LCJleHAiOjE3NjU3MDkzMDd9.TqtEHna60xW73RF-32vv7omWWAiltdP-PHKZ9uFgSyY"
          alt="Julia, Pilates Instructor"
          className="mx-auto w-32 h-32 rounded-full object-cover mb-4"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Align With Fun</h1>
        <p className="text-gray-700 max-w-xl mx-auto">
          Join our Pilates classes and embrace wellness.
        </p>
      </section>

      {/* Upcoming Classes */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Upcoming Classes</h2>

        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>No upcoming classes.</p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 mt-2">
            {events.map((event) => (
              <li
                key={event.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition relative"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{event.name}</h3>
                  {event.description && (
                    <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                  )}
                  <p className="text-gray-500 text-sm">
                    {format(new Date(event.start_at), "PPPp")} (
                    {formatDistanceToNow(new Date(event.start_at), { addSuffix: true })})
                  </p>
                  <p className="text-gray-500 text-sm">
                    Duration: {event.duration_minutes} min
                  </p>
                  <p className="text-gray-500 text-sm">
                    {event.suggested_price ? `Donate: ${event.suggested_price}` : "Free"}
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                    Spots left: {event.max_participants - (event as any).booked_count}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="mt-4 px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Join Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Join {selectedEvent.name}</h3>
              <button
                onClick={handleCloseForm}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleJoinSubmit} className="space-y-3">
              <label className="block">
                <span className="text-gray-700 text-sm">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 text-sm">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 text-sm">Phone</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </label>

              <button
                type="submit"
                className="w-full mt-2 bg-green-700 text-white rounded-lg py-2 font-semibold hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                Submit
              </button>
            </form>

            {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
          </div>
        </div>
      )}
    </main>
  );
}
