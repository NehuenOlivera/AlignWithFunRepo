"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import PricingModal from "@/components/PricingModal";
import Footer from "@/components/Footer";

export default function HomeContent() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-[#FAF4EB]">
        <Hero />
        <div className="flex flex-col items-center space-y-4 mt-8 mb-16">
          <a
            href="/about"
            className="w-70 px-6 py-3 rounded-full text-center text-[1.2rem] font-semibold bg-(--color-terracota) text-(--color-beige) hover:bg-(--color-terracota)/90"
          >
            Learn About Us
          </a>
          <a
            href="/classes"
            className="w-70 px-6 py-3 rounded-full text-center text-[1.2rem] font-semibold bg-(--color-terracota) text-(--color-beige) hover:bg-(--color-terracota)/90"
          >
            Book a Class
          </a>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-70 px-6 py-3 rounded-full text-center text-[1.2rem] font-semibold bg-(--color-terracota) text-(--color-beige) hover:bg-(--color-terracota)/90"
          >
            Pricing
          </button>
        </div>
        <PricingModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </main>
      <Footer />
    </>
  );
}
