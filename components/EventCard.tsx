import { formatDistanceToNow, format } from "date-fns";
import { Event } from "../types";

type Props = {
  event: Event;
  onJoin: (event: Event) => void;
};

export default function EventCard({ event, onJoin }: Props) {
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
        {event.spots_left > 0 ? (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            {event.spots_left} spots left
          </span>
        ) : (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
            FULL
          </span>
        )}
      </div>

      <button
        onClick={() => onJoin(event)}
        className="mt-4 px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
      >
        {event.spots_left > 0 ? "Join Class" : "Join Waitlist"}
      </button>
    </li>
  );
}
