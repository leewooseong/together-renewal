import Image from 'next/image';

import ApproveCheck from '../common/approveCheck';
import {DateTimeInfoChip} from '../common/chips/chip-info';
import ProgressBar from '../common/progressBar';

export default function ContainerInfo({
  name,
  location,
  dateTime,
  capacity,
  participantCount,
}: IGetGatherings) {
  return (
    <div className="flex h-[270px] w-[486px] items-center justify-center rounded-2xl bg-white">
      <div className="flex h-[222px] w-full flex-col items-center justify-center">
        <div className="flex h-[129px] w-full justify-center border-b-2 border-dashed border-gray-200">
          <div className="relative flex h-[86px] w-[438px] flex-col">
            <button type="button" className="absolute right-0 top-0">
              <Image src="/emptyHeart.svg" alt="찜 아이콘" width={48} height={48} />
            </button>
            <div className="h-[28px] w-[390px] text-lg font-semibold">
              <p>{name}</p>
            </div>
            <div className="h-[20px] w-[390px] text-sm font-medium">{location}</div>
            <div className="mt-[14px] h-[24px] w-[390px]">
              <DateTimeInfoChip dateTime={dateTime} />
            </div>
          </div>
        </div>
        <div className="mt-[24px] flex h-[69px] w-[438px] flex-col">
          <div className="relative flex h-[29px] w-full items-center text-sm font-semibold">
            <p>{`모집 정원 ${capacity}명`}</p>
            <div className="ml-[12px]">{/* ////아이콘//// */}</div>
            <div className="absolute bottom-0 right-0 h-[24px] text-sm font-medium">
              {ApproveCheck(participantCount)}
            </div>
          </div>
          <div className="mt-[12px] h-[4px] w-full">{ProgressBar(participantCount, capacity)}</div>
          <div className="relative mt-[8px] flex h-[16px] w-full items-center text-xs font-medium">
            <p>최소인원 5명</p>
            <p className="absolute right-0">{`최대인원 ${capacity}명`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
