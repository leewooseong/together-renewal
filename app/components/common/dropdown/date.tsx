export default function Date() {
  function handleDateClick(event: React.ChangeEvent<HTMLInputElement>) {
    const getDate = event.currentTarget.value;
    console.log(typeof getDate);
  }
  return (
    <div>
      <label htmlFor="date-input" className="h-6 w-28 bg-slate-800">
        hi
      </label>
      <input id="date-input" type="date" onChange={handleDateClick} />
    </div>
  );
}
