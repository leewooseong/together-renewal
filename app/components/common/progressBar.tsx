export default function ProgressBar(participantCount: number, capacity: number) {
  const percent = Math.min((participantCount / capacity) * 100, 100);
  return (
    <div className="h-full w-full overflow-hidden rounded-md bg-orange-50">
      <div className="h-full rounded-full bg-orange-600" style={{width: `${percent}%`}} />
    </div>
  );
}
