"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import PricingModal from "@/components/PricingModal";

export default function HomeContent() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-b from-[#0a1f12] to-[#101010]">
      <Hero />
      <div className="flex flex-col items-center space-y-4 mt-8 mb-16">
        <a
          href="/about"
          className="homePageButton bg-(--color-yellow) hover:bg-(--color-beige)/80 transition"
        >
          Learn About Us
        </a>
        <a
          href="/classes"
          className="homePageButton bg-(--color-yellow) hover:bg-(--color-beige)/80 transition"
        >
          Book a Class
        </a>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="homePageButton bg-(--color-yellow) hover:bg-(--color-beige)/80 transition"
        >
          Pricing
        </button>
      </div>
      <PricingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
