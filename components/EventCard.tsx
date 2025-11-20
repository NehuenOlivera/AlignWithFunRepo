import { format } from "date-fns";
import { Event } from "../types";
import { Calendar, Clock, DollarSign } from "lucide-react";

type Props = {
  event: Event;
  onJoin: (event: Event) => void;
};

export default function EventCard({ event, onJoin }: Props) {
  const isFull = event.spots_left <= 0;
  const alreadyJoined = event.user_status;

  return (
    <li className="eventCard md:w-full max-w-md group">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-2">
            {/* Header */}
            <h3 className="eventCard-title">{event.name}</h3>

            {/* Status Badge */}
            <div className="mb-6">
              {alreadyJoined ? (
                <span className="eventCard-badge-joined">
                  ✓ You&apos;re in!
                </span>
              ) : isFull ? (
                <span className="eventCard-badge-full">Class Full</span>
              ) : (
                <span className="eventCard-badge-available bg-[#022e14]/10 text-[#022e14] rounded-full border border-[#022e14]/20">
                  {event.spots_left} {event.spots_left === 1 ? "spot" : "spots"}{" "}
                  left
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <p className="eventCard-text">{event.description}</p>
          )}

          {/* Info Grid */}
          <div className="space-y-2 mb-4">
            <div className="eventCard-text">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(event.start_at), "PPPp")}</span>
            </div>

            <div className="eventCard-text">
              <Clock className="h-4 w-4" />
              <span>{event.duration_minutes} minutes</span>
            </div>

            <div className="eventCard-text">
              <DollarSign className="h-4 w-4" />
              <span>
                {event.suggested_price ? `$${event.suggested_price}` : "Free"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {!alreadyJoined ? (
          <button
            disabled={isFull}
            onClick={() => onJoin(event)}
            className={`eventCard-button-available ${
              isFull
                ? "bg-[#101010]/10 text-[#101010]/50 cursor-not-allowed visibility: hidden"
                : "bg-[#022e14] text-[#f5ece5] hover:bg-[#022e14]/90 active:scale-95"
            }`}
          >
            {isFull ? "Class Full" : "Join Class"}
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3 px-4 rounded-12 font-semibold bg-[#022e14]/10 text-[#022e14] cursor-default text-sm"
          >
            Class Booked
          </button>
        )}
      </div>
    </li>
  );
}
