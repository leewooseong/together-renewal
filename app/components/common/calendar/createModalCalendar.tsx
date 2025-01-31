'use client';

import {Dispatch, SetStateAction, useState} from 'react';

import {getTodayStart} from '../../../utils/calendar';

import {DatePicker} from './datePicker';
import {TimeSelector} from './timeSelector';

export type TimeType = 'hour' | 'minute' | 'period';

export type TimeSelectorType = {
  type: TimeType;
  dataList: string[];
  selectedTime: string;
  setSelectedTime: Dispatch<SetStateAction<string>>;
};

// Todo: resizeObserver를 이용해서 날짜 선택 컴포넌트의 높이에 따라 캘린더의 높이가 될 수 있도록 수정
// Todo: provider를 이용하는 방법으로 변경 필요
export function CreateModalCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(getTodayStart());
  const [selectedHour, setSelectedHour] = useState<string>('12');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('AM');

  const hours = ['12', ...Array.from({length: 11}, (_, i) => String(i + 1).padStart(2, '0'))];
  const minutes = Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'));
  const period = ['AM', 'PM'];

  const timeInfoList: TimeSelectorType[] = [
    {type: 'hour', dataList: hours, selectedTime: selectedHour, setSelectedTime: setSelectedHour},
    {
      type: 'minute',
      dataList: minutes,
      selectedTime: selectedMinute,
      setSelectedTime: setSelectedMinute,
    },
    {
      type: 'period',
      dataList: period,
      selectedTime: selectedPeriod,
      setSelectedTime: setSelectedPeriod,
    },
  ];

  return (
    <div className="mx-auto inline-flex h-64 flex-row overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-[0_10px_10px_-5px_rgba(0,0,0,0.04)]">
      <div className="mr-[10px] w-[270px]">
        <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      {timeInfoList.map(timeInfo => (
        <div className="ml-[10px] border-l border-gray-200" key={timeInfo.type}>
          <TimeSelector
            dataList={timeInfo.dataList}
            selectedTime={timeInfo.selectedTime}
            setSelectedTime={timeInfo.setSelectedTime}
          />
        </div>
      ))}
    </div>
  );
}
