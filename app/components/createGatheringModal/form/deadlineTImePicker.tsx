import {useState} from 'react';

import clsx from 'clsx';
import {format} from 'date-fns';
import Image from 'next/image';

import {InputProps} from '../../../types/gatherings/createGathering.types';

export function DeadlineTImePicker({value, onChange, error = undefined}: InputProps<string>) {
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDateTime = (date: string) => {
    if (!date) return '';
    return format(new Date(date), 'yyyy-MM-dd h:mm aaa').toUpperCase();
  };

  return (
    <div className="grow">
      <label className="mb-1 block text-base font-medium">마감 날짜</label>
      <button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className={clsx(
          'flex w-full items-center rounded-lg bg-gray-50 px-4 py-3',
          'text-left text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-600',
          !value && 'text-gray-400',
        )}
      >
        <span className="mr-[10px] grow">
          {value ? formatDateTime(value) : formatDateTime(new Date().toISOString())}
        </span>
        <Image src="icons/calendar.svg" alt="달력 아이콘" width={18} height={20} />
      </button>

      {/* formData 처리용 input */}
      <input
        type="datetime-local"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="hidden"
      />
      {/* TODO: 커스텀 캘린더 컴포넌트 작업 필요 */}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
