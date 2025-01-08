export function ProgressBar(participantCount: number, capacity: number) {
  const percent = Math.min((participantCount / capacity) * 100, 100);
  return (
    <div className="w-full bg-orange-50 h-full rounded-md overflow-hidden">
      <div className="bg-orange-600 h-full rounded-full" style={{width: `${percent}%`}} />
    </div>
  );
}
