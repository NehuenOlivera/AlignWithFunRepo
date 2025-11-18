import EventCard from "./EventCard";
import { Event } from "../types";

type Props = {
  events: Event[];
  loading: boolean;
  onJoin: (event: Event) => void;
};

export default function UpcomingClasses({ events, loading, onJoin }: Props) {
  if (loading)
    return <div className="text-center py-8 text-[#f5ece5]/70">Loading...</div>;
  if (!events.length)
    return (
      <div className="text-center py-8 text-[#f5ece5]/70">
        No upcoming classes available.
      </div>
    );

  return (
    <div className="flex justify-center w-full">
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-9/10 md:w-full">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onJoin={onJoin} />
        ))}
      </ul>
    </div>
  );
}
