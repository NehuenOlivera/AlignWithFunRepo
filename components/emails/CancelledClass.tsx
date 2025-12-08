import { Event } from "@/types";

interface CancelClassEmailProps {
  //   user: User;
  event: Event;
}

export function CancelClassEmailTemplate({
  //   user,
  event,
}: CancelClassEmailProps) {
  return (
    <div>
      <h1>
        Hi, User. The event <b>{event.name}</b> has been cancelled.
      </h1>
    </div>
  );
}
