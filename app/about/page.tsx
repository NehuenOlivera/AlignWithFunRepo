import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Target, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-linear-to-b from-[#0a1f12] to-[#101010] text-center">
        <section className="relative overflow-hidden">
          <Image
            src={
              "https://xtprzolahofaihkihtby.supabase.co/storage/v1/object/sign/Images/ChatGPT%20Image%20Nov%2025,%202025,%2006_36_32%20PM.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yMjE5YmQyMy03NDlkLTRlZjItOTEyZi1jZjRmMWVlZTIxNTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvQ2hhdEdQVCBJbWFnZSBOb3YgMjUsIDIwMjUsIDA2XzM2XzMyIFBNLnBuZyIsImlhdCI6MTc2NDA1OTgyMCwiZXhwIjoxNzk1NTk1ODIwfQ.dw2ZnOC14b-uSTCCnI1wLrsH94EVI2o6WUqN_JDFwQc"
            }
            alt="Align With Fun Pilates Studio"
            fill={true}
            className="inset-0 object-cover opacity-10"
            loading="eager"
          />
          <div className="relative z-20 container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mt-8 mb-6 text-(--color-beige)">
                About{" "}
                <span className="text-(--color-yellow)">Align With Fun</span>
              </h1>
              <div className="h-1 w-24 bg-(--color-yellow) mx-auto mb-8 rounded-full" />

              <p className="text-xl md:text-2xl leading-relaxed">
                Welcome to Align With Fun, your premier destination for Pilates
                classes that combine fitness, fun, and community! Our mission is
                to help you achieve your health and wellness goals through the
                power of Pilates, all while enjoying a supportive and engaging
                environment.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-10">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-4 inline-flex p-3">
                  <Heart className="w-8 h-8 text-(--color-yellow)" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Wellness First</h3>
                <p className="">
                  Your health and well-being are at the heart of everything we
                  do. We create programs that nurture both body and mind.
                </p>
              </Card>

              <Card className="p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-4 inline-flex p-3">
                  <Users className="w-8 h-8 text-(--color-yellow)" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Community</h3>
                <p className="">
                  Join a vibrant community of like-minded individuals who
                  support and inspire each other on their wellness journey.
                </p>
              </Card>

              <Card className="p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-4 inline-flex p-3">
                  <Target className="w-8 h-8 text-(--color-yellow)" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Results Driven</h3>
                <p className="">
                  We&apos;re committed to helping you achieve real, measurable
                  results through expert-led classes and personalized attention.
                </p>
              </Card>

              <Card className="p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-4 inline-flex p-3">
                  <Sparkles className="w-8 h-8 text-(--color-yellow)" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Fun & Joy</h3>
                <p className="">
                  We believe fitness should be enjoyable! Our classes blend
                  challenging workouts with an atmosphere of positivity and fun.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-10">
              Experience the perfect blend of fitness and fun. Book your first
              class today!
            </p>
            <Link
              href="/classes"
              className="text-black text-2xl bg-(--color-yellow) px-4.5 py-2.5 rounded-4xl
             font-semibold shadow-lg hover:shadow-accent/20 transition-all duration-300"
            >
              Book a Class
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
