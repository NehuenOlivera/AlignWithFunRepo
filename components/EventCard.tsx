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
    <li className="card flex flex-col justify-between p-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">{event.name}</h3>

        {event.description && (
          <p className="text-sm mb-2">{event.description}</p>
        )}

        <p className="text-sm">
          {format(new Date(event.start_at), "PPPp")} (
          {formatDistanceToNow(new Date(event.start_at), { addSuffix: true })})
        </p>

        <p className="text-sm">Duration: {event.duration_minutes} min</p>

        <p className="text-sm">
          {event.suggested_price ? `Price: $${event.suggested_price}` : "Free"}
        </p>

        {alreadyJoined ? (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-blue-200 text-blue-800 rounded-full">
            Joined
          </span>
        ) : isFull ? (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-gray-900 rounded-full bg-gray-300">
            FULL
          </span>
        ) : (
          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-green-200 text-green-800 rounded-full">
            {event.spots_left} spots left
          </span>
        )}
      </div>

      {!alreadyJoined ? (
        <button
          disabled={isFull}
          onClick={() => onJoin(event)}
          className={`button mt-4 text-white ${
            isFull
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800"
          }`}
        >
          {isFull ? "Full" : "Join Class"}
        </button>
      ) : (
        <button
          disabled
          className="button mt-4 bg-green-700 text-white cursor-default"
        >
          You&apos;re in!
        </button>
      )}
    </li>
  );
}
