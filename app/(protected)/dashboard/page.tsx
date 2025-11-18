import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="card bg-gradient-to-br from-[#f5ece5] to-[#f5ece5]/95 p-12 text-center">
          <div className="text-left mb-6">
            <Link
              href="/"
              className="inline-block text-sm bg-white/10 text-[#022e14] px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
            >
              ← Home
            </Link>
          </div>
          {/* Icon */}
          <div className="mb-8 text-6xl">✨</div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-[#022e14] mb-3">
            Coming Soon
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[#022e14]/80 mb-8">
            Your wellness journey awaits
          </p>

          {/* Divider */}
          <div className="h-px bg-[#022e14]/10 mb-8"></div>

          {/* Description */}
          <p className="text-center text-[#022e14]/70 mb-12 leading-relaxed max-w-lg mx-auto">
            We&apos;re crafting a beautiful dashboard where you&apos;ll manage
            your profile, track your progress, and celebrate your wellness
            milestones.
          </p>

          {/* Features */}
          <div className="space-y-4 mb-12 text-left max-w-sm mx-auto">
            <div className="flex gap-4 items-start">
              <span className="text-3xl flex-shrink-0">📊</span>
              <div>
                <p className="font-semibold text-[#022e14]">
                  Progress Tracking
                </p>
                <p className="text-sm text-[#022e14]/70">
                  Monitor your improvements over time
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-3xl flex-shrink-0">📅</span>
              <div>
                <p className="font-semibold text-[#022e14]">
                  Schedule Management
                </p>
                <p className="text-sm text-[#022e14]/70">
                  Manage your pilates classes with ease
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-3xl flex-shrink-0">⭐</span>
              <div>
                <p className="font-semibold text-[#022e14]">Achievements</p>
                <p className="text-sm text-[#022e14]/70">
                  Unlock badges and celebrate progress
                </p>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <p className="text-sm text-[#022e14]/60">
            Thank you for your patience as we build something amazing! 💪
          </p>
        </div>
      </div>
    </div>
  );
}
