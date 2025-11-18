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
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="card max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Join {event.name}</h3>
          <button
            onClick={handleClose}
            className="text-gray-200 hover:text-white"
          >
            ✕
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="button bg-green-700 text-white hover:bg-green-800 w-full"
        >
          Confirm Join
        </button>

        {message && <p className="mt-3 text-sm text-black">{message}</p>}
      </div>
    </div>
  );
}
