import { format } from "date-fns";

export interface UserWithNameAndEmail {
  first_name: string;
  email: string;
}

export interface EventInfoForEmail {
  name: string;
  start_at: string;
  duration_minutes: number;
}

interface JoinClassEmailProps {
  event: EventInfoForEmail;
  user: UserWithNameAndEmail;
}

export function JoinClassEmailTemplate({ event, user }: JoinClassEmailProps) {
  const formattedDate = format(new Date(event.start_at), "eeee, PPP");
  const formattedTime = format(new Date(event.start_at), "p");

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
          color: "#333",
          lineHeight: "24px",
          fontSize: "16px",
        }}
      >
        {/* Header */}
        <h1
          style={{
            textAlign: "center",
            margin: "0 0 24px 0",
            color: "#022e14",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Your Spot is Booked! ✨
        </h1>

        {/* Greeting */}
        <p>Hi {user.first_name},</p>

        {/* Main Intro */}
        <p>Thank you for booking with us.</p>

        <p>
          Your spot in class with{" "}
          <span style={{ color: "#022e14", fontWeight: "bold" }}>
            Align With Fun
          </span>{" "}
          is officially locked in.
        </p>

        {/* Session Details */}
        <p style={{ marginTop: "24px", fontWeight: "bold", color: "#022e14" }}>
          Here are your session details:
        </p>

        <p>
          📅 <strong>Date:</strong> {formattedDate}
        </p>
        <p>
          ⏰ <strong>Time:</strong> {formattedTime}
        </p>
        <p>
          📍 <strong>Location:</strong> Cairns Marina - Finger D (on top of{" "}
          <a href="https://maps.app.goo.gl/xo72ynMaYEp7z7a98">
            Pure snorkelling office
          </a>
          )
        </p>
        <p>
          ⏳ <strong>Duration:</strong> {event.duration_minutes || "60 minutes"}
        </p>

        {/* What to Bring */}
        <p
          style={{
            marginTop: "24px",
            fontWeight: "bold",
            color: "#022e14",
          }}
        >
          What to bring:
        </p>

        <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
          <li>
            Yoga mat{" "}
            <span style={{ color: "#555" }}>
              (No mat? No stress — I&apos;ve got spares you can hire for $5,
              just let me know 24h before the class)
            </span>
          </li>
          <li>Water bottle to stay hydrated</li>
          <li>Towel for comfort</li>
        </ul>

        {/* Payment Note */}
        <p style={{ marginTop: "24px" }}>
          If you&apos;re coming by car there&apos;s a 2 hour parking under the
          pier.
          <br />
          Feel free to pay by transfer or bring cash.
          <br />
          Arrive about 10 minutes early to ground yourself, breathe in the
          marina views, and take care of payment before we start.
        </p>

        {/* Contact */}
        <p style={{ marginTop: "24px" }}>
          If there&apos;s anything you need prior to class, don&apos;t hesitate
          to get in touch.
          <br />
          Can&apos;t wait to move with you! 💚
        </p>

        {/* Divider */}
        <hr style={{ margin: "32px 0", borderColor: "#e5e5e5" }} />

        {/* Footer */}
        <p
          style={{
            fontSize: "14px",
            textAlign: "center",
            marginBottom: 0,
            color: "#555",
          }}
        >
          Warmly,
          <br />
          <span style={{ color: "#022e14", fontWeight: "bold" }}>
            Align With Fun
          </span>
        </p>
      </div>
    </div>
  );
}
