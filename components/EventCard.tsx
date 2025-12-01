import { format } from "date-fns";
import { Event } from "../types";
import { Calendar, Clock } from "lucide-react";
import { BsStopwatch } from "react-icons/bs";

type Props = {
  event: Event;
  onJoin: (event: Event) => void;
  onCancelBooking: (event: Event) => void;
};

export default function EventCard({ event, onJoin, onCancelBooking }: Props) {
  const isFull = event.spots_left <= 0;
  const userStatus = event.user_status;

  return (
    <li className="eventCard md:w-full max-w-md group">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start">
            {/* Header */}
            <h3 className="eventCard-title">{event.name}</h3>

            {/* Status Badge */}
            <div>
              {userStatus === "booked" ? (
                <span className="eventCard-badge-joined">
                  ✓ You&apos;re in!
                </span>
              ) : isFull ? (
                <span className="eventCard-badge-full">Class Full</span>
              ) : (
                <span className="eventCard-badge-available">
                  {event.spots_left} {event.spots_left === 1 ? "spot" : "spots"}{" "}
                  left
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <p className="eventCard-text mb-2">{event.description}</p>
          )}

          {/* Info Grid */}
          <div className="space-y-2 mb-4">
            <div className="eventCard-text">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(event.start_at), "EEE, do LLLL yyyy")}
              </span>
            </div>

            <div className="eventCard-text">
              <Clock className="h-4 w-4" />
              <span>{format(new Date(event.start_at), "p")}</span>
            </div>

            <div className="eventCard-text">
              <BsStopwatch className="h-4 w-4" />
              <span>{event.duration_minutes} minutes</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {userStatus === "booked" ? (
          <button
            onClick={() => onCancelBooking(event)}
            className="eventCard-button-cancel-booking"
          >
            Cancel Booking
          </button>
        ) : (
          <button
            disabled={isFull}
            onClick={() => onJoin(event)}
            className={`eventCard-button-available ${
              isFull
                ? "bg-[#101010] text-[#101010]/50 cursor-not-allowed"
                : "bg-(--color-dark-green) text-[#f5ece5] hover:bg-[#022e14]/90 active:scale-95 cursor-pointer"
            }`}
          >
            {isFull ? "Class Full" : "Join Class"}
          </button>
        )}
      </div>
    </li>
  );
}
