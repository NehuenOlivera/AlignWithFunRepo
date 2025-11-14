"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { format } from "date-fns";

type Event = {
  id: string;
  name: string;
  description: string | null;
  start_at: string; // <-- correct column name
  duration_minutes: number;
  max_participants: number;
  suggested_price: number | null;
  post_schedule_message: string | null;
};

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_cancelled", false)
        .gte("start_at", new Date().toISOString())
        .order("start_at", { ascending: true });

      // Better logging so you can see Supabase responses clearly
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

  return (
    <div className="p-8 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Upcoming Pilates Classes</h1>

      {loading && <p>Loading...</p>}

      {!loading && events.length === 0 && <p>No upcoming classes.</p>}

      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="p-4 bg-white rounded-xl shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{event.name}</h2>
                {event.description && <p className="text-sm text-gray-700 mt-1">{event.description}</p>}
                <p className="text-sm text-gray-500 mt-2">
                  {format(new Date(event.start_at), "PPPp")} · {event.duration_minutes} min
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-700">
                  {event.suggested_price ? `Suggested: ${event.suggested_price}` : "Free"}
                </div>
                <div className="text-xs text-gray-400 mt-1">Spots limited</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
