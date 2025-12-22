import Header from "@/components/header";
import UserData from "./userDataCard";
import { UserHealthFormContainer } from "@/components/UserHealthFormContainer";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-(--color-beige) py-4 px-4">
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
