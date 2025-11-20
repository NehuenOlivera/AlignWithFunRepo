import Header from "@/components/header";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-linear-to-b from-[#0a1f12] to-[#101010] flex items-center justify-center py-8 sm:py-4! px-4">
        <div className="w-full max-w-4xl mx-4! sm:mx-0!">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#f5ece5] mb-1">
                Create new Class
              </h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
