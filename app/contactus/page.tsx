import Header from "@/components/header";
import ContactUsForm from "@/components/ContactUsForm";

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-(--color-beige) pt-4">
        <h1 className="text-(--color-dark-green) text-5xl font-semibold text-center">
          Contact us
        </h1>
        <ContactUsForm />
      </main>
    </>
  );
}
