export default function formatDateUtil(dateTime: string) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return {
    year: `${year}`,
    date: `${month}월 ${day}일`,
    time: `${hours}:${minutes}`,
  };
}
