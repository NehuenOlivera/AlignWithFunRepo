"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calendar, Clock, Users, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Attendee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Event {
  id: string;
  name: string;
  start_at: string;
  duration_minutes: number;
  max_participants: number;
  description?: string;
  attendees_amount: number;
  attendees: Attendee[];
}

export default function EventCard({
  ev,
  onEdit,
  onDelete,
}: {
  ev: Event;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Card className="eventCard bg-(--color-light-green) border border-(--color-dark-green)">
      {/* Edit button */}
      <button
        className="absolute top-7 right-5 p-1 rounded-md hover:bg-white/10 transition text-green border border-(--color-dark-green)"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4 text-(--color-dark-green)" />
      </button>

      {/* Delete button */}
      <button
        className="absolute top-7 right-14 p-1 rounded-md hover:bg-white/10 transition text-red-600 border border-red-600"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <CardHeader>
        <CardTitle className="eventCard-title text-(--color-black-pastel)">
          {ev.name}
        </CardTitle>

        {ev.description && (
          <CardDescription className="eventCard-text text-(--color-black-pastel)">
            {ev.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="eventCard-text text-(--color-black-pastel)">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(ev.start_at), "EEEE do, LLL - p")}</span>
        </div>

        <div className="eventCard-text text-(--color-black-pastel)">
          <Clock className="h-4 w-4" />
          <span>{ev.duration_minutes} minutes</span>
        </div>

        <div className="eventCard-text text-(--color-black-pastel)">
          <Users className="h-4 w-4" />
          <span>Attendees {ev.attendees_amount}</span>
        </div>

        {ev.attendees_amount > 0 && (
          <div className="mt-2">
            <details>
              <summary className="cursor-pointer text-sm text-(--color-dark-green)">
                View Attendees
              </summary>
              <ul className="mt-2 max-h-40 overflow-y-auto border border-[#f5ece5]/10 rounded-md p-2 space-y-2">
                {ev.attendees.map((att) => (
                  <li
                    key={att.id}
                    className="text-sm text-(--color-dark-green)"
                  >
                    {att.first_name} {att.last_name} - {att.email}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
