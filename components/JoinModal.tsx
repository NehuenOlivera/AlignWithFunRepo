import { Event } from "../types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  event: Event;
  message: string;
  isLoggedIn: boolean;
  handleSubmit: () => Promise<void> | void;
  handleClose: () => void;
};

export default function JoinModal({
  event,
  message,
  isLoggedIn,
  handleSubmit,
  handleClose,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    setIsLoading(true);
    await handleSubmit();
    setIsLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
      onClick={handleClose}
    >
      <div
        className="joinClassModal max-w-md w-full p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-semibold text-[#022e14]">
            Join {event.name}
          </h3>
          <button
            onClick={handleClose}
            className="text-[#101010]/50 hover:text-[#101010] transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Event Details */}
        <div className="bg-[#022e14]/5 rounded-12 p-4 mb-6 space-y-2 text-sm text-[#101010]/80">
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {format(new Date(event.start_at), "PP p")}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {event.location}
          </p>
          <p>
            <span className="font-semibold">Duration:</span>{" "}
            {event.duration_minutes} minutes
          </p>
          <p>
            <span className="font-semibold">Price:</span>{" "}
            {event.suggested_price ? `$${event.suggested_price}` : "Free"}
          </p>
        </div>

        {/* Action Buttons */}
        {!isLoggedIn ? (
          <>
            <div>
              <button
                className="w-full p-2 rounded-full bg-(--color-dark-green) cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Log in to join the class
              </button>
            </div>
          </>
        ) : (
          <div className="flex gap-3 mb-4">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`joinClassModalConfirmButton flex items-center justify-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Confirm Join"
              )}
            </button>

            <button
              onClick={handleClose}
              className="joinClassModalCancelButton"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Message */}
        {message && (
          <div
            className={`text-sm p-3 rounded-10 text-center ${
              message.includes("Error")
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
