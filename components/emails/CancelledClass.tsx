import { Event, Attendee } from "@/components/admin/eventsManager";
import { format } from "date-fns";

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
          Hi {attendee.first_name},
        </p>

        {/* Message */}
        <p style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
          We are reaching out to let you know, that{" "}
          <strong>your upcoming Pilates class has been cancelled.</strong>
        </p>

        <p style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
          <strong style={{ color: "#022e14" }}>Class: </strong>
          {event.name}.
        </p>

        <p style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
          <strong style={{ color: "#022e14" }}>Date & Time: </strong>{" "}
          {format(new Date(event.start_at), "PPPP p")}
        </p>

        <p style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
          We know how valuable your time is, and We appreciate your
          understanding.
        </p>
        <p style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
          Your booking has already been updated on our end, and you&apos;re
          warmly invited to{" "}
          <a href="https://www.alignwithfun.com/classes">
            <strong>join any future class that suits your schedule.</strong>
          </a>{" "}
          Whenever you&apos;re ready, we would love to welcome you back on the
          mat.
        </p>

        <p style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
          If you need help rescheduling or have any questions at all, please
          don&apos;t hesitate to reach out — we are always here to support you.
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
          Thank you again for your kindness and understanding.
          <br />
          Warmest regards,
          <br />
          <span style={{ color: "#022e14", fontWeight: "bold" }}>
            The Align With Fun Team
          </span>
        </p>
      </div>
    </div>
  );
}
