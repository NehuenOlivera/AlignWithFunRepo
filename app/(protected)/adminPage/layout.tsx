import { redirect } from "next/navigation";
import { getUserWithRole } from "@/utils/supabase/getUserWithRole";

export default async function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserWithRole();

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
}
