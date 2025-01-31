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
