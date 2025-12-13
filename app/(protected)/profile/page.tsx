import Header from "@/components/header";
import UserData from "./userDataCard";
import { UserHealthFormContainer } from "@/components/UserHealthFormContainer";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-linear-to-b from-[#0a1f12] to-[#101010] py-4! px-4!">
        <div className="container mx-auto max-w-6xl mb-5">
          <UserData />
        </div>
        <div className="container mx-auto max-w-6xl">
          <UserHealthFormContainer />
        </div>
      </main>
    </>
  );
}
