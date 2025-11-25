"use client";

import Hero from "../components/Hero";

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#0a1f12] to-[#101010]">
      <Hero />
      <div className="flex flex-col items-center space-y-4 mt-8 mb-16">
        <a
          href="/classes"
          className="homePageButton bg-(--color-beige) hover:bg-(--color-beige)/80 transition"
        >
          Book a Class
        </a>
        <a
          href="/about"
          className="homePageButton bg-(--color-beige) hover:bg-(--color-beige)/80 transition"
        >
          Learn About Us
        </a>
      </div>
    </main>
  );
}
