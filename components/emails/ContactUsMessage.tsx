interface ContactUsEmailProps {
  name: string;
  lastname: string;
  email: string;
  message: string;
}

export function ContactUsEmailTemplate({
  name,
  lastname,
  email,
  message,
}: ContactUsEmailProps) {
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
            New inquiery from {email}
          </h1>
        </div>

        {/* Greeting */}
        <p style={{ fontSize: "16px", color: "#333" }}>Hi Julia,</p>

        {/* Message */}
        <p style={{ fontSize: "16px", color: "#333", lineHeight: "24px" }}>
          The user:{" "}
          <strong>
            {name}
            {", "} {lastname}
          </strong>{" "}
          has submited a message:
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#333",
            lineHeight: "24px",
            whiteSpace: "pre-line",
          }}
        >
          {message}
        </p>

        {/* Divider */}
        <hr style={{ margin: "34px 0", borderColor: "#e5e5e5" }} />

        {/* Footer */}
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          If you want to reply, simply hit the reply button, the email is
          configured.
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
