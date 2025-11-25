import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero py-8 px-6">
      <Image
        src={
          "https://xtprzolahofaihkihtby.supabase.co/storage/v1/object/sign/Images/Foto%20CV.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yMjE5YmQyMy03NDlkLTRlZjItOTEyZi1jZjRmMWVlZTIxNTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvRm90byBDVi5qcGVnIiwiaWF0IjoxNzYzMTE3MzA3LCJleHAiOjE3NjU3MDkzMDd9.TqtEHna60xW73RF-32vv7omWWAiltdP-PHKZ9uFgSyY"
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
