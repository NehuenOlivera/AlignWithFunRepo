import Header from "@/components/header";
import UserData from "./userDataCard";
import { UserHealthFormContainer } from "@/components/UserHealthFormContainer";
import { UserClassesContainer } from "@/components/UserClassesContainer";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-(--color-beige) py-4 px-4">
        <div className="container mx-auto max-w-6xl mb-5">
          <UserData />
        </div>
        <div className="container mx-auto max-w-6xl mb-5">
          <UserHealthFormContainer />
        </div>
        <div className="container mx-auto max-w-6xl">
          <UserClassesContainer />
        </div>
      </main>
    </>
  );
}
