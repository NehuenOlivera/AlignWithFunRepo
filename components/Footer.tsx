import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <footer className="grid grid-cols-3 fixed inset-x-0 bottom-0 bg-(--color-dark-green) text-white p-4 md:px-20 items-center">
      <a className="text-center underline">Privacy Policy</a>
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
  );
}
