import { Event } from "../types";

type Props = {
  event: Event;
  message: string;
  handleSubmit: () => void;
  handleClose: () => void;
};

export default function JoinModal({
  event,
  message,
  handleSubmit,
  handleClose,
}: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
      onClick={handleClose}
    >
      <div
        className="card max-w-md w-full p-8 shadow-2xl"
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
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Event Details */}
        <div className="bg-[#022e14]/5 rounded-12 p-4 mb-6 space-y-2 text-sm text-[#101010]/80">
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
        <div className="flex gap-3 mb-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#022e14] text-[#f5ece5] py-3 rounded-12 font-semibold hover:bg-[#022e14]/90 transition-all active:scale-95"
          >
            Confirm Join
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-[#101010]/10 text-[#101010] py-3 rounded-12 font-semibold hover:bg-[#101010]/20 transition-all"
          >
            Cancel
          </button>
        </div>

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
