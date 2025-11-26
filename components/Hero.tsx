import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero py-8 px-6">
      <Image
        src={
          "https://xtprzolahofaihkihtby.supabase.co/storage/v1/object/public/Public%20images/Foto%20CV.jpeg"
        }
        alt={"Julia. Pilates Instructor"}
        width={124}
        height={124}
        className="mx-auto w-32 h-32 rounded-full object-cover mb-4"
        loading="eager"
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        Align With <span className="text-(--color-yellow)">Fun</span>
      </h1>
      <p className="max-w-xl mx-auto">
        Transform Your Body, Elevate Your Spirit
      </p>
    </section>
  );
}
