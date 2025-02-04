'use client';

import {Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState} from 'react';

import clsx from 'clsx';

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

// Todo: provider를 이용하는 방법으로 변경 필요
export function CreateModalCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(getTodayStart());
  const [selectedHour, setSelectedHour] = useState<string>('12');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('AM');

  const datePickerRef = useRef<HTMLDivElement>(null);
  const [datePickerHeight, setDatePickerHeight] = useState<string>('0px');

  // 초기 높이 랜더링시 0으로 처리되는 문제 해결을 위한 useLayoutEffect
  useLayoutEffect(() => {
    if (datePickerRef.current) {
      const initialHeight = datePickerRef.current.offsetHeight;
      if (initialHeight) {
        setDatePickerHeight(`${initialHeight}px`);
      }
    }
  }, []);

  // 달마다 주차수가 달라서, 달 변경시 달라지는 datePicker의 높이를 반영하기 위한 resizeObserver
  useEffect(() => {
    if (!datePickerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        setDatePickerHeight(`${element.offsetHeight}px`);
      });
    });

    resizeObserver.observe(datePickerRef.current);

    // eslint-disable-next-line consistent-return
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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
    <div
      style={{
        height: datePickerHeight,
      }}
      className={clsx(
        'mx-auto box-content inline-flex flex-row overflow-hidden rounded-xl border border-gray-200 bg-white px-3 py-[7px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.04)]',
      )}
    >
      <div className="mr-[10px] w-[270px]">
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          datePickerRef={datePickerRef}
        />
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
