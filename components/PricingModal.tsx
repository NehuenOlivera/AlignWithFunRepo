"use client";

export default function PricingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto text-[#f5ece5]">
        <h1 className="text-xl font-bold mb-2">
          Classes are $15 as an easy energy exchange.
        </h1>
        <p>
          Feel free to pay by transfer or bring cash. Arrive about 10 minutes
          early to ground yourself, breathe in the views, and take care of
          payment before we start.
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-(--color-dark-green) rounded-lg border border-white/10 font-semibold w-full active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  );
}
