import Image from 'next/image';

import formatDateUtil from '@/app/utils/formatDateUtil';

/** 오늘 마감 태그 */
export function CloseTag({registrationEnd}: {registrationEnd: string}) {
  const {year, date, time} = formatDateUtil(registrationEnd);

  const getToday = new Date();
  const today = `${getToday.getFullYear()}년 ${getToday.getMonth() + 1}월 ${getToday.getDate()}일`;

  const registrationDate = `${year}년 ${date}`;

  if (registrationDate !== today) {
    return null;
  }

  const closeTime = time.split(':')[0];
  return (
    <div className="absolute top-0 right-0 w-[117px] h-[32px] bg-orange-600 text-white flex items-center justify-center rounded-bl-xl pr-1">
      <Image src="/clockIcon.svg" className="w-[24px] h-[24px]" alt="시계 아이콘" />
      <p className="font-medium text-xs">오늘 {closeTime}시 마감</p>
    </div>
  );
}
