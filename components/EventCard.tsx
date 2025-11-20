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
    <li className="card md:w-full max-w-md group">
      <div className="flex flex-col justify-between h-full">
        {/* Header */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#022e14] group-hover:text-[#022e14]/80 transition-colors">
            {event.name}
          </h3>

          {/* Description */}
          {event.description && (
            <p className="text-sm text-[#101010]/70 mb-4 leading-relaxed">
              {event.description}
            </p>
          )}

          {/* Info Grid */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-[#101010]/80">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(event.start_at), "PPPp")}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#101010]/80">
              <Clock className="h-4 w-4" />
              <span>{event.duration_minutes} minutes</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#101010]/80">
              <DollarSign className="h-4 w-4" />
              <span>
                {event.suggested_price ? `$${event.suggested_price}` : "Free"}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mb-6">
            {alreadyJoined ? (
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-[#022e14]/15 text-[#022e14] rounded-full border border-[#022e14]/30">
                ✓ You&apos;re in!
              </span>
            ) : isFull ? (
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-[#101010]/10 text-[#101010]/60 rounded-full border border-[#101010]/20">
                Class Full
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-[#022e14]/10 text-[#022e14] rounded-full border border-[#022e14]/20">
                {event.spots_left} {event.spots_left === 1 ? "spot" : "spots"}{" "}
                left
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        {!alreadyJoined ? (
          <button
            disabled={isFull}
            onClick={() => onJoin(event)}
            className={`w-full py-3 px-4 rounded-12 font-semibold transition-all text-sm ${
              isFull
                ? "bg-[#101010]/10 text-[#101010]/50 cursor-not-allowed"
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
