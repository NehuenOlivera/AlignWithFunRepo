import Header from "@/components/header";
import { createClient } from "@/utils/supabase/server";
import EventsManager from "@/components/admin/eventsManager";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase.rpc("admin_get_events");

  if (error) {
    console.error("Error loading events:", error);
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-linear-to-b from-[#0a1f12] to-[#101010] py-4! px-4!">
        <div className="container mx-auto max-w-6xl">
          <EventsManager initialEvents={events || []} />
        </div>
      </main>
    </>
  );
}
