import { Event } from "../types";

type Props = {
  event: Event;
  name: string;
  email: string;
  phone: string;
  message: string;
  setName: (val: string) => void;
  setEmail: (val: string) => void;
  setPhone: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleClose: () => void;
};

export default function JoinModal({
  event,
  name,
  email,
  phone,
  message,
  setName,
  setEmail,
  setPhone,
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
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            <span className="text-gray-700 text-sm">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 text-sm">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 text-sm">Phone</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          <button
            type="submit"
            className="w-full mt-2 bg-green-700 text-white rounded-lg py-2 font-semibold hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Submit
          </button>
        </form>

        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
