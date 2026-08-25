export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a00]">
      <div className="font-mono text-[#ffb000]">
        <span className="animate-pulse">Booting GuestOS...</span>
      </div>
    </div>
  );
}
