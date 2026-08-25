'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a00] p-8">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">⚠</div>
        <h1 className="mb-2 font-mono text-2xl text-[#ffb000]">System Error</h1>
        <p className="mb-6 font-mono text-sm text-[#b37d00]">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button
          onClick={() => reset()}
          className="rounded border border-[#ffb000]/30 bg-[#ffb000]/10 px-6 py-2 font-mono text-sm text-[#ffb000] transition-colors hover:bg-[#ffb000]/20"
        >
          Restart Terminal
        </button>
      </div>
    </div>
  );
}
