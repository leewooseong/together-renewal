'use client';

import {useState} from 'react';

import {startOfToday} from 'date-fns';

import Calendar from './calendar';

function CalendarWrapper() {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday()); // startOfToday === today's date

  return (
    <div className="mx-auto max-w-[336px] rounded-xl border border-gray-200 bg-white px-11 py-6 shadow-[0_10px_10px_-5px_rgba(0,0,0,0.04)]">
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
}

export default CalendarWrapper;
