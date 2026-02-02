import { format } from "date-fns";
import { Event } from "../types";
import { Calendar, Clock, MapPin } from "lucide-react";
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
    <li className="eventCard md:w-full max-w-md group bg-(--color-terracota)">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start">
            {/* Header */}
            <h3 className="eventCard-title text-(--color-beige)">
              {event.name}
            </h3>

            {/* Status Badge */}
            <div>
              {userStatus === "booked" ? (
                <span className="eventCard-badge-joined bg-(--color-beige) border border-(--color-beige) text-(--color-terracota)">
                  ✓ You&apos;re in!
                </span>
              ) : isFull ? (
                <span className="eventCard-badge-full bg-(--color-black-pastel)">
                  Class Full
                </span>
              ) : (
                <span className="eventCard-badge-available border border-(--color-beige) text-(--color-beige) rounded-full">
                  {event.spots_left} {event.spots_left === 1 ? "spot" : "spots"}{" "}
                  left
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <p className="eventCard-text text-(--color-beige) mb-2">
              {event.description}
            </p>
          )}

          {/* Info Grid */}
          <div className="space-y-2 mb-4">
            <div className="eventCard-text text-(--color-beige)">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(event.start_at), "EEE, do LLLL yyyy")}
              </span>
            </div>

            {/* {event.location && ( */}
            <div className="eventCard-text text-(--color-beige)">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            {/* )} */}

            <div className="eventCard-text text-(--color-beige)">
              <Clock className="h-4 w-4" />
              <span>{format(new Date(event.start_at), "p")}</span>
            </div>

            <div className="eventCard-text text-(--color-beige)">
              <BsStopwatch className="h-4 w-4" />
              <span>{event.duration_minutes} minutes</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {userStatus === "booked" ? (
          <button
            onClick={() => onCancelBooking(event)}
            className="eventCard-button-cancel-booking hover:bg-(--color-beige)/20 border border-(--color-beige)"
          >
            Cancel Booking
          </button>
        ) : (
          <button
            disabled={isFull}
            onClick={() => onJoin(event)}
            className={`eventCard-button-available ${
              isFull
                ? "bg-(--color-black-pastel) text-(--color-beige) cursor-not-allowed"
                : "bg-(--color-beige) text-(--color-terracota) hover:bg-(--color-beige)/80 active:scale-95 cursor-pointer"
            }`}
          >
            {isFull ? "Class Full" : "Join Class"}
          </button>
        )}
      </div>
    </li>
  );
}
