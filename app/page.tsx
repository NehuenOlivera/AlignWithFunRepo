"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { format } from "date-fns";

type Event = {
  id: string;
  name: string;
  description: string | null;
  start_at: string;
  duration_minutes: number;
  max_participants: number;
  suggested_price: number | null;
  post_schedule_message: string | null;
};

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Load events from Supabase
  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_cancelled", false)
        .gte("start_at", new Date().toISOString())
        .order("start_at", { ascending: true });

      if (error) {
        console.error("Supabase error:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      } else {
        console.log("Supabase data:", data);
      }

      setEvents((data as Event[] | null) || []);
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
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
      }
    } catch (err) {
      console.error(err);
      setMessage("Unexpected error joining event.");
    }
  };

  const handleCloseForm = () => {
    setSelectedEvent(null);
    setMessage(""); // Clear message on close
  };

  return (
    <div className="p-8 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Upcoming Events</h1>

      {loading && <p>Loading...</p>}
      {!loading && events.length === 0 && <p>No upcoming classes.</p>}

      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="p-4 bg-white rounded-xl shadow flex justify-between items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{event.name}</h2>
              {event.description && <p className="text-sm text-gray-700 mt-1">{event.description}</p>}
              <p className="text-sm text-gray-500 mt-2">
                {format(new Date(event.start_at), "PPPp")} · {event.duration_minutes} min
              </p>
              <div className="text-sm text-gray-700 mt-1">
                {event.suggested_price ? `Suggested: ${event.suggested_price}` : "Free"}
              </div>
            </div>
            <button
              onClick={() => setSelectedEvent(event)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Join
            </button>
          </li>
        ))}
      </ul>

      {/* Inscription form */}
      {selectedEvent && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900"> Sign up for {selectedEvent.name}</h2>
            <button
              onClick={handleCloseForm}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleJoinSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>

          {/* Feedback message */}
          {message && (
            <p className="text-sm text-gray-700 mt-2">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}
