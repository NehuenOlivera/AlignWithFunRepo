"use client";

import { ToastContainer } from "react-toastify";

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={2000} />;
    </>
  );
}
