export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <span className="mb-3 ml-2 text-2xl font-semibold text-[#FE508B]">
        Loading...
      </span>
      <div className="h-20 w-20 animate-spin rounded-full border-4 border-[#FE508B] border-t-transparent" />
    </div>
  );
}
