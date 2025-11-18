export default function Dashboard() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#101010" }}
    >
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div
          className="rounded-3xl p-12 shadow-2xl"
          style={{ backgroundColor: "#022e14" }}
        >
          {/* Icon */}
          <div className="mb-8 text-7xl text-center">🚀</div>

          {/* Heading */}
          <h1
            className="text-4xl font-bold mb-2 text-center"
            style={{ color: "#ffffff" }}
          >
            Coming Soon
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg text-center mb-8"
            style={{ color: "#f5ece5" }}
          >
            Your profile is on the way
          </p>

          {/* Divider */}
          <div
            className="h-px mb-8 mx-0"
            style={{ backgroundColor: "#f5ece5", opacity: 0.2 }}
          ></div>

          {/* Description */}
          <p
            className="text-center mb-10 leading-relaxed"
            style={{ color: "#f5ece5" }}
          >
            We&apos;re crafting something special. Soon you&apos;ll be able to manage your profile and track your progress.
          </p>

          {/* Feature List */}
          <div className="space-y-5 mb-10">
            <div className="flex gap-4 items-start">
              <span className="text-3xl flex-shrink-0">📊</span>
              <div className="text-left">
                <p className="font-semibold text-lg" style={{ color: "#ffffff" }}>
                  Track Progress
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-3xl flex-shrink-0">📅</span>
              <div className="text-left">
                <p className="font-semibold text-lg" style={{ color: "#ffffff" }}>
                  Manage Classes
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-3xl flex-shrink-0">⭐</span>
              <div className="text-left">
                <p className="font-semibold text-lg" style={{ color: "#ffffff" }}>
                  Earn Badges
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p
            className="text-center text-sm"
            style={{ color: "#f5ece5", opacity: 0.7 }}
          >
            Thanks for your patience! 💪
          </p>
        </div>
      </div>
    </div>
  );
}
