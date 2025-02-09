// utils/calendar.ts
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns';

import {CalendarDays, MonthNavigationResult} from '../types/calendar.types';
import {TimeInfo} from '../types/gatherings/createGathering.types';

/**
 * 날짜 포맷팅
 */
export const formatDate = (date: Date, formatStr: string): string => {
  return format(date, formatStr);
};

/**
 * 달력에 표시할 날짜들을 계산
 */
export const getCalendarDays = (firstDayCurrentMonth: Date): CalendarDays => {
  const startDay = startOfWeek(startOfMonth(firstDayCurrentMonth));
  const endDay = endOfWeek(endOfMonth(firstDayCurrentMonth));

  return {
    startDay,
    endDay,
    days: eachDayOfInterval({start: startDay, end: endDay}),
  };
};

/**
 * 이전 달로 이동
 */
export const getPreviousMonth = (
  firstDayCurrentMonth: Date,
  formatStr: string = 'MMM-yyyy',
): MonthNavigationResult => {
  const firstDayNextMonth = add(firstDayCurrentMonth, {months: -1});
  return {
    firstDayNextMonth,
    formattedMonth: formatDate(firstDayNextMonth, formatStr),
  };
};

/**
 * 다음 달로 이동
 */
export const getNextMonth = (
  firstDayCurrentMonth: Date,
  formatStr: string = 'MMM-yyyy',
): MonthNavigationResult => {
  const firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
  return {
    firstDayNextMonth,
    formattedMonth: formatDate(firstDayNextMonth, formatStr),
  };
};

/**
 * 날짜 파싱
 */
export const parseDate = (dateStr: string, formatStr: string, referenceDate: Date): Date => {
  return parse(dateStr, formatStr, referenceDate);
};

/**
 * 날짜 비교 함수들
 */
export const dateComparison = {
  isEqual: (date1: Date, date2: Date): boolean => isEqual(date1, date2),
  isSameMonth: (date1: Date, date2: Date): boolean => isSameMonth(date1, date2),
  isToday: (date: Date): boolean => isToday(date),
  isAfter: (date1: Date, date2: Date): boolean => isAfter(startOfDay(date1), startOfDay(date2)),
  isBefore: (date1: Date, date2: Date): boolean => isBefore(startOfDay(date1), startOfDay(date2)),
};

/**
 * 날짜의 요일 인덱스 반환 (0-6)
 */
export const getDayIndex = (date: Date): number => {
  return getDay(date);
};

/**
 * 오늘 날짜의 시작 시점
 */
export const getTodayStart = (): Date => {
  return startOfToday();
};

/**
 * 해당 달의 마지막 날짜를 구함
 * @param dateStr 날짜 문자열 (예: 'Jan-2024')
 * @param formatStr 날짜 포맷 (예: 'MMM-yyyy')
 * @param referenceDate 기준 날짜
 * @returns Date
 */
export const getLastDayOfMonth = (
  dateStr: string,
  formatStr: string,
  referenceDate: Date,
): Date => {
  const firstDay = parseDate(dateStr, formatStr, referenceDate);
  return endOfMonth(firstDay);
};

/**
 * 해당 달의 첫 날짜를 구함
 * @param dateStr 날짜 문자열 (예: 'Jan-2024')
 * @param formatStr 날짜 포맷 (예: 'MMM-yyyy')
 * @param referenceDate 기준 날짜
 * @returns Date
 */
export const getFirstDayOfMonth = (
  dateStr: string,
  formatStr: string,
  referenceDate: Date,
): Date => {
  const firstDay = parseDate(dateStr, formatStr, referenceDate);
  return startOfMonth(firstDay);
};

// api용 데이터로 변환하기 위한 함수
export const formatDateTimeForAPI = (dateTime: TimeInfo): string => {
  const {selectedDate, selectedHour, selectedMinute, selectedPeriod} = dateTime;

  // 기존 날짜 복사
  const newDate = new Date(selectedDate);

  // 12시간제를 24시간제로 변환
  let hour = parseInt(selectedHour as string, 10);
  if (selectedPeriod === 'PM' && hour !== 12) {
    hour += 12;
  } else if (selectedPeriod === 'AM' && hour === 12) {
    hour = 0;
  }

  // 기존 분 복사
  const minute = parseInt(selectedMinute as string, 10);

  // 시, 분 설정
  newDate.setHours(hour);
  newDate.setMinutes(minute);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  // return newDate;
  return format(newDate, "yyyy-MM-dd'T'HH:mm");
};

export const getTimeInfoUI = (timeInfo: TimeInfo): string => {
  const year = timeInfo.selectedDate.getFullYear();
  const month = String(timeInfo.selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(timeInfo.selectedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day} ${timeInfo.selectedHour}:${timeInfo.selectedMinute} ${timeInfo.selectedPeriod}`;
};

export const getInitialDate = (): TimeInfo => ({
  selectedDate: getTodayStart(),
  selectedHour: '12',
  selectedMinute: '00',
  selectedPeriod: 'AM',
});
