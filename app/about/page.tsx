import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Heart, Mountain, Users, Waves } from "lucide-react";
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
              "https://xtprzolahofaihkihtby.supabase.co/storage/v1/object/public/Public%20images/Pilates%20studio.png"
            }
            alt="Align With Fun Pilates Studio"
            fill={true}
            className="inset-0 object-cover opacity-10"
            loading="eager"
          />
          <div className="relative z-20 container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-6xl font-bold mt-8 mb-6 text-(--color-beige)">
                Movement for{" "}
                <span className="text-(--color-yellow)">Everyone</span>
              </h1>
              <div className="h-1 w-24 bg-(--color-yellow) mx-auto mb-8 rounded-full" />

              <p className="text-xl md:text-2xl leading-relaxed">
                Pilates that feels fun, welcoming, and totally accessible — no
                matter your fitness level.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-12">
              <h2 className="text-3xl md:text-4xl text-(--color-yellow) font-bold text-center mb-8">
                Our Philosophy
              </h2>
              <p className="text-lg text-center leading-relaxed mb-6">
                At Align with Fun, the whole vibe is simple:{" "}
                <span className="text-(--color-yellow) font-semibold block">
                  Movement is for everyone.
                </span>
                Every class is designed so anyone can jump in, find their flow,
                and move in a way that feels good. Pilates shouldn&apos;t feel
                exclusive — it should feel fun and welcoming.
              </p>
              <p className="text-lg text-center leading-relaxed">
                We&apos;re all about creating a space where movement feels
                light, inclusive, and connected — to yourself, to others, and to
                the stunning place we get to move in.
              </p>
            </Card>
          </div>
        </section>

        <section className="py-20 px-10">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              What Makes Us Special
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-4 inline-flex p-3">
                  <Waves className="w-8 h-8 text-(--color-yellow)" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">The Location</h3>
                <p className="">
                  We practice right by the marina, overlooking the boats and the
                  open ocean, with the mountains sitting in the background.
                  It&apos;s the kind of view that instantly slows you down,
                  grounds you, and reminds you to breathe a little deeper.
                </p>
              </Card>

              <Card className="p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-4 inline-flex p-3">
                  <Users className="w-8 h-8 text-(--color-yellow)" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">The Community</h3>
                <p className="">
                  There&apos;s something special about moving together — the
                  shared energy, the good chats, the little boosts of
                  encouragement. That exchange is part of our vibe and shapes
                  everything we do.
                </p>
              </Card>

              <Card className="p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-4 inline-flex p-3">
                  <Heart className="w-8 h-8 text-(--color-yellow)" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">The Experience</h3>
                <p className="">
                  Every class is designed to be inclusive and accessible.
                  Whether you&apos;re brand new to Pilates or a seasoned
                  practitioner, you&apos;ll find your place here and move at a
                  pace that works for you.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-linear-to-b from-[#0a1f12] to-[#101010]">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center">
              <Mountain className="w-16 h-16 mx-auto mb-6 text-(--color-yellow)" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Where Nature Meets Movement
              </h2>
              <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                Our studio&apos;s setting adds to the magic. With views of the
                marina, boats gently swaying, the vast ocean stretching beyond,
                and mountains framing it all — this is more than just a place to
                exercise. It&apos;s a space that naturally invites calm,
                presence, and connection.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-xl mb-10">
              Come experience Pilates in a way that feels welcoming, connected,
              and uniquely yours.
            </p>
            <Link
              href="/classes"
              className="text-(--color-dark-green) text-2xl bg-(--color-yellow) px-4.5 py-2.5 rounded-4xl
             font-semibold shadow-lg transition-all duration-300"
            >
              Book Your First Class
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
