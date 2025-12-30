import { SocialIcon } from "react-social-icons";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import { useState } from "react";

export default function Footer() {
  const [privacyPolicyModalOpen, setPrivacyPolicyModalOpen] = useState(false);

  return (
    <>
      <footer className="grid grid-cols-3 fixed inset-x-0 bottom-0 bg-(--color-dark-green) text-white p-4 md:px-20 items-center">
        <p
          className="text-center underline hover:cursor-pointer"
          onClick={() => setPrivacyPolicyModalOpen(true)}
        >
          Privacy Policy
        </p>
        <a className="text-center underline" href="/contactus">
          Contact Us
        </a>

        <div className="text-center">
          <SocialIcon
            bgColor="transparent"
            url="https://www.instagram.com/align.with.fun/"
          ></SocialIcon>
        </div>
      </footer>
      <PrivacyPolicyModal
        open={privacyPolicyModalOpen}
        onClose={() => setPrivacyPolicyModalOpen(false)}
      />
    </>
  );
}
