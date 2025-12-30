"use client";

export default function PrivacyPolicyModal({
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
        <h1 className="text-xl font-bold mb-2">Privacy Policy</h1>
        <p>
          Your privacy is important to us. It is Align With Fun’s policy to
          respect your privacy regarding any information we may collect from you
          across our website, through our booking system, and through any other
          platforms we use to operate our services.
        </p>
        <br />
        <p>
          We only ask for personal information when it is genuinely needed to
          provide a service to you, such as booking classes, communicating
          updates, or ensuring your safety during sessions. We collect this
          information by fair and lawful means, with your knowledge and consent,
          and we are clear about why it is being collected and how it will be
          used.
        </p>
        <br />
        <p>
          Any personal information we collect is retained only for as long as
          necessary to deliver our services. We take reasonable and commercially
          acceptable steps to protect your information from loss, theft,
          unauthorised access, disclosure, copying or misuse.
        </p>
        <br />
        <p>
          We do not share personally identifying information publicly or with
          third parties, except where required by law or where necessary to
          provide our services.
        </p>
        <br />
        <p>
          Our website may contain links to external sites that are not operated
          by us. Please note that we have no control over the content or
          practices of these sites and cannot accept responsibility or liability
          for their respective privacy policies.
        </p>
        <br />
        <p>
          You are free to decline providing personal information, with the
          understanding that this may limit our ability to offer certain
          services.
        </p>
        <br />
        <p>
          Your continued use of our website, booking system and services will be
          regarded as acceptance of our practices around privacy and personal
          information. If you have any questions about how your data is handled,
          you’re always welcome to get in touch.
        </p>
        <br />
        <p>
          This policy is effective as of <strong>01.01.2026</strong>
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
