import { Event, Attendee } from "@/components/admin/eventsManager";

interface CancelClassEmailProps {
  event: Event;
  attendee: Attendee;
}

export function CancelClassEmailTemplate({
  event,
  attendee,
}: CancelClassEmailProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f6f6f6",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "32px",
          borderRadius: "10px",
          border: "1px solid #e5e5e5",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "22px",
              margin: 0,
              fontWeight: "bold",
              color: "#022e14",
            }}
          >
            Class Cancellation Notice
          </h1>
        </div>

        {/* Greeting */}
        <p style={{ fontSize: "16px", color: "#333" }}>
          Hi {attendee.first_name} {attendee.last_name},
        </p>

        {/* Message */}
        <p style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
          We regret to inform you that the event{" "}
          <strong style={{ color: "#022e14" }}>{event.name}</strong> has been
          cancelled.
        </p>

        <p style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
          We’re sorry for any inconvenience this may cause. You’ll be notified
          if the event is rescheduled or if any alternative sessions become
          available.
        </p>

        {/* Divider */}
        <hr style={{ margin: "32px 0", borderColor: "#e5e5e5" }} />

        {/* Footer */}
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          Thank you for your understanding.
          <br />
          <span style={{ color: "#022e14", fontWeight: "bold" }}>
            The Align With Fun Team
          </span>
        </p>
      </div>
    </div>
  );
}
