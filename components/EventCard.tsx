import { formatDistanceToNow, format } from "date-fns";
import { Event } from "../types";

type Props = {
  event: Event;
  onJoin: (event: Event) => void;
};

export default function EventCard({ event, onJoin }: Props) {
  const isFull = event.spots_left <= 0;
  const alreadyJoined = event.user_status;

  return (
    <li className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition relative">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          {event.name}
        </h3>

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
          {event.suggested_price ? `Price: ${event.suggested_price}` : "Free"}
        </p>

        {/* STATUS BADGE */}
        {alreadyJoined ? (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
            Already joined
          </span>
        ) : isFull ? (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
            FULL
          </span>
        ) : (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            {event.spots_left} spots left
          </span>
        )}
      </div>

      {/* BUTTON */}
      {!alreadyJoined ? (
        <button
          disabled={isFull}
          onClick={() => onJoin(event)}
          className={`mt-4 px-4 py-2 text-white font-semibold rounded-lg transition ${
            isFull
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800"
          }`}
        >
          {isFull ? "Join Waitlist" : "Join Class"}
        </button>
      ) : (
        <button
          disabled
          className="mt-4 px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg cursor-default"
        >
          You&apos;re in!
        </button>
      )}
    </li>
  );
}
