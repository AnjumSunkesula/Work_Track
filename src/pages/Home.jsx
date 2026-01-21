import AuthCard from "../components/auth/AuthCard"

export default function Home() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 px-6">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center text-white pr-12">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Work smarter.<br />Track better.
        </h1>

        <p className="text-lg text-white/80 max-w-md">
          Manage your tasks, priorities, and productivity in one place.
          Stay organized and focused every day.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center">
        <AuthCard />
      </div>
    </div>
  );
}
