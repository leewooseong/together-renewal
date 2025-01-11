export default function Date() {
  function handleDateClick(event: React.ChangeEvent<HTMLInputElement>) {
    const getDate = event.currentTarget.value;
    console.log(typeof getDate);
  }
  return (
    <div>
      <label htmlFor="date-input" className="bg-slate-800 w-28 h-6">
        hi
      </label>
      <input id="date-input" type="date" onChange={handleDateClick} />
    </div>
  );
}
