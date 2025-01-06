import {formatDateUtil} from '@/app/utils/formatDateUtil';

export function DateTimeInfoChip({dateTime}: {dateTime: string}) {
  const {date, time} = formatDateUtil(dateTime);

  return (
    <div className="flex space-x-2">
      <div className="w-[58px] h-[24px] rounded-md bg-gray-900 text-white text-xs font-medium flex items-center justify-center">
        <p>{date}</p>
      </div>
      <div className="w-[51px] h-[24px] rounded-md bg-gray-900 text-orange-600 font-medium text-xs flex items-center justify-center">
        <p>{time}</p>
      </div>
    </div>
  );
}
