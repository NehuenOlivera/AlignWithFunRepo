"use client";

import { Calendar, Clock } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { BsStopwatch } from "react-icons/bs";
import { format } from "date-fns";
import { ToggableHeader } from "./ui/ToggableHeader";
import { Collapse } from "react-collapse";
import { createClient } from "@/utils/supabase/client";
import CancelBookingModal from "./CancelBookingModal";
import { toast } from "react-toastify";

type UserClass = {
  id: string;
  name: string;
  description: string | null;
  start_at: string;
  duration_minutes: number;
  suggested_price: number | null;
  location: string;
};

type AttendeeRow = {
  events: UserClass | null;
};

export function UserClassesContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState<UserClass[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [classToCancel, setClassToCancel] = useState<UserClass | null>(null);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  function classesToggleCollapse() {
    setIsOpen((prev) => !prev);
  }

  const fetchClasses = useCallback(async () => {
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("attendees")
      .select(
        `
      events!inner (
        id,
        name,
        description,
        start_at,
        duration_minutes,
        suggested_price,
        location
      )
    `
      )
      .eq("user_id", user.id)
      .eq("status", "booked");

    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    const classesData = (data as unknown as AttendeeRow[])
      .map((row) => row.events)
      .filter((e): e is UserClass => Boolean(e));

    setClasses(classesData);
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setIsLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || cancelled) return;

      const { data, error } = await supabase
        .from("attendees")
        .select(
          `
        events!inner (
          id,
          name,
          description,
          start_at,
          duration_minutes,
          suggested_price,
          location
        )
      `
        )
        .eq("user_id", user.id)
        .eq("status", "booked");

      if (error || cancelled) return;

      const classesData = (data as unknown as AttendeeRow[])
        .map((row) => row.events)
        .filter((e): e is UserClass => Boolean(e));

      if (!cancelled) {
        setClasses(classesData);
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const handleCancelBooking = async () => {
    if (!classToCancel) return;

    const res = await fetch("/api/cancelBooking", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: classToCancel.id }),
    });

    const data = await res.json();
    setMessage(data.error ? "Error: " + data.error : data.message);
    if (!data.error) {
      fetchClasses();
      setClassToCancel(null);
      setMessage("");
      toast.success(data.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-60 flex items-center justify-center">
        <p className="text-(--color-dark-green)">Loading your classes...</p>
      </div>
    );
  }

  return (
    <>
      <ToggableHeader
        title="My classes"
        isOpen={isOpen}
        onToggle={classesToggleCollapse}
      />
      <Collapse isOpened={isOpen}>
        {classes.length === 0 && (
          <p className="text-(--color-terracota) text-3xl text-center pt-2">
            You don&apos;t have any upcoming classes yet.
          </p>
        )}
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4 w-full">
          {classes.map((event) => (
            <li
              key={`${event.name}-${event.start_at}`}
              className="eventCard max-w-md bg-(--color-terracota) w-full"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="eventCard-title text-(--color-beige)">
                    {event.name}
                  </h3>

                  {event.description && (
                    <p className="eventCard-text text-(--color-beige) mb-2">
                      {event.description}
                    </p>
                  )}

                  <div className="space-y-2 mb-4">
                    <div className="eventCard-text text-(--color-beige) flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(event.start_at), "EEE, do LLLL yyyy")}
                      </span>
                    </div>

                    <div className="eventCard-text text-(--color-beige) flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{format(new Date(event.start_at), "p")}</span>
                    </div>

                    <div className="eventCard-text text-(--color-beige) flex items-center gap-2">
                      <BsStopwatch className="h-4 w-4" />
                      <span>{event.duration_minutes} minutes</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setClassToCancel(event)}
                  className="eventCard-button-cancel-booking hover:bg-(--color-beige)/20 border border-(--color-beige)"
                >
                  Cancel Booking
                </button>
              </div>
            </li>
          ))}
        </ul>
        {classToCancel && (
          <CancelBookingModal
            event={classToCancel}
            message={message}
            handleSubmit={handleCancelBooking}
            handleClose={() => {
              setClassToCancel(null);
              setMessage("");
            }}
          />
        )}
      </Collapse>
    </>
  );
}
