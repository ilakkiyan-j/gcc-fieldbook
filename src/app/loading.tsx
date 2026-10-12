export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/3"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="h-32 bg-slate-200 rounded"></div>
        <div className="h-32 bg-slate-200 rounded"></div>
        <div className="h-32 bg-slate-200 rounded"></div>
      </div>
      <div className="h-64 bg-slate-200 rounded mt-6"></div>
    </div>
  );
}
