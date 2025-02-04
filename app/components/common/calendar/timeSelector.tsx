// timeSelector.tsx

'use client';

import {Dispatch, SetStateAction} from 'react';

import clsx from 'clsx';

type TimeSelectorProps = {
  dataList: string[];
  selectedTime: string;
  setSelectedTime: Dispatch<SetStateAction<string>>;
};

export function TimeSelector({dataList, selectedTime, setSelectedTime}: TimeSelectorProps) {
  const handleSelectTime = (event: React.MouseEvent<HTMLButtonElement>) => {
    const clickedElement = event.currentTarget;
    const clickedTime = clickedElement.dataset.time;

    if (!clickedElement || !clickedTime) return;

    setSelectedTime(clickedTime);
  };
  return (
    <div className="scrollbar-thin flex h-full flex-col gap-[10px] overflow-x-hidden p-[10px]">
      {dataList.map(time => {
        return (
          <button
            type="button"
            data-time={time}
            key={time}
            onClick={handleSelectTime}
            className={clsx(
              'min-h-8 min-w-10 rounded-lg text-base transition-colors',
              selectedTime === time
                ? 'bg-orange-600 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
