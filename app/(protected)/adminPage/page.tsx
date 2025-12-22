import Header from "@/components/header";
import { createClient } from "@/utils/supabase/server";
import EventsManager from "@/components/admin/eventsManager";
import UsersManager, { User } from "@/components/admin/UsersManager";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data, error: eventsError } = await supabase
    .rpc("admin_get_events")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .returns<any>();
  const events = Array.isArray(data) ? data : [];

  const { data: users, error: usersError } = await supabase
    .rpc("get_all_users_for_admin")
    .returns<User[]>();

  if (eventsError) console.error("Error loading events:", eventsError);
  if (usersError) console.error("Error loading users:", usersError);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-(--color-beige) py-4 px-4">
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
