import EventCard from "./EventCard";
import { Event } from "../types";

type Props = {
  events: Event[];
  loading: boolean;
  onJoin: (event: Event) => void;
};

export default function UpcomingClasses({ events, loading, onJoin }: Props) {
  if (loading) return <p>Loading...</p>;
  if (!events.length) return <p>No upcoming classes.</p>;

  return (
    <ul className="grid gap-6 md:grid-cols-2 mt-2">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onJoin={onJoin} />
      ))}
    </ul>
  );
}
