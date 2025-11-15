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
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Join {event.name}</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-700 text-white rounded-lg py-2 font-semibold hover:bg-green-800"
        >
          Confirm Join
        </button>

        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
