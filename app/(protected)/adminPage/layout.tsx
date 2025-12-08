import { redirect } from "next/navigation";
import { getUserWithRole } from "@/utils/supabase/getUserWithRole";
import { ToastContainer } from "react-toastify";

export default async function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserWithRole();

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
