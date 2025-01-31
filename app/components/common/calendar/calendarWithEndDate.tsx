'use client';

import {Dispatch, SetStateAction, useState} from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import {colStartClasses} from '../../../constants/calendar';
import {
  dateComparison,
  formatDate,
  getCalendarDays,
  getDayIndex,
  getFirstDayOfMonth,
  getNextMonth,
  getPreviousMonth,
  getTodayStart,
} from '../../../utils/calendar';

type CalendarProps = {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
};

// Todo: startDate, endDate에 대한 작업 처리 필요
export function CalendarWithEndDate({selectedDate, setSelectedDate}: CalendarProps) {
  const today = getTodayStart();
  const [currentMonth, setCurrentMonth] = useState(formatDate(selectedDate ?? today, 'MMM-yyyy'));
  const firstDayCurrentMonth = getFirstDayOfMonth(currentMonth, 'MMM-yyyy', selectedDate || today);

  const {days} = getCalendarDays(firstDayCurrentMonth);

  const previousMonth = () => {
    const {formattedMonth} = getPreviousMonth(firstDayCurrentMonth);
    setCurrentMonth(formattedMonth);
  };

  const nextMonth = () => {
    const {formattedMonth} = getNextMonth(firstDayCurrentMonth);
    setCurrentMonth(formattedMonth);
  };

  const handleSelectDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dateElement = event.currentTarget.closest('li');

    if (!dateElement || !dateElement.dataset.index) return;

    const dateIndex = parseInt(dateElement.dataset.index, 10);
    const newSelectedDate = days[dateIndex];
    setSelectedDate(newSelectedDate);
  };

  return (
    <div className="bg-white">
      <div className="flex items-center">
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <Image
            src="/icons/Calendar-l-arrow.svg"
            alt="이전 달로 이동"
            width={24}
            height={24}
            // className="size-5"
            aria-hidden="true"
          />
        </button>
        <h2 className="flex-auto text-center text-sm font-medium text-gray-800">
          {formatDate(firstDayCurrentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <Image
            src="/icons/Calendar-r-arrow.svg"
            alt="다음 달로 이동"
            width={24}
            height={24}
            // className="size-5"
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="grid h-8 grid-cols-7 items-center text-center text-sm font-semibold leading-6 text-gray-800">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      {/* 날짜 표시 구간 */}
      <ul className="grid grid-cols-7 text-sm font-medium text-gray-800">
        {days.map((day, dayIdx) => {
          return (
            <li
              key={day.toString()}
              data-index={dayIdx}
              className={`${dayIdx === 0 && colStartClasses[getDayIndex(day)]}`}
            >
              <button
                type="button"
                onClick={handleSelectDate}
                className={clsx(
                  'h-8 w-full rounded-lg transition-colors',
                  [!dateComparison.isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400'],
                  dateComparison.isEqual(day, selectedDate)
                    ? 'bg-orange-600 text-white'
                    : dateComparison.isToday(day) && 'text-orange-600',
                )}
              >
                <time dateTime={formatDate(day, 'yyyy-MM-dd')}>{formatDate(day, 'd')}</time>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
