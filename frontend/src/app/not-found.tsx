
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-slate-400">
        Page not found
      </p>
      <a
        href="/dashboard"
        className="mt-6 text-purple-400 hover:underline"
      >
        Back to Dashboard
      </a>
    </div>
  );
}
