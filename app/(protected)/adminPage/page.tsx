import Header from "@/components/header";
import { createClient } from "@/utils/supabase/server";
import EventsManager from "@/components/admin/eventsManager";
import UsersManager from "@/components/admin/UsersManager";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: events, error: eventsError } = await supabase.rpc(
    "admin_get_events"
  );
  const { data: users, error: usersError } = await supabase.rpc(
    "get_all_users_for_admin"
  );

  if (eventsError) {
    console.error("Error loading events:", eventsError);
  }
  if (usersError) {
    console.error("Error loading users:", usersError);
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-linear-to-b from-[#0a1f12] to-[#101010] py-4! px-4!">
        <div className="container mx-auto max-w-6xl mb-5">
          <EventsManager initialEvents={events || []} />
        </div>
        <div className="container mx-auto max-w-6xl">
          <UsersManager users={users || []} />
        </div>
      </main>
    </>
  );
}
