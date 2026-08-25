import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a00] p-8">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">404</div>
        <h1 className="mb-2 font-mono text-2xl text-[#ffb000]">
          Page Not Found
        </h1>
        <p className="mb-6 font-mono text-sm text-[#b37d00]">
          The requested resource does not exist on this system.
        </p>
        <Link
          href="/"
          className="rounded border border-[#ffb000]/30 bg-[#ffb000]/10 px-6 py-2 font-mono text-sm text-[#ffb000] transition-colors hover:bg-[#ffb000]/20"
        >
          Return to Terminal
        </Link>
      </div>
    </div>
  );
}
