import Image from 'next/image';

import isClosedUtil from '@/app/utils/isClosedUtil';

import ApproveCheck from '../common/approveCheck';
import {DateTimeInfoChip} from '../common/chips/chip-info';
import {CloseTag} from '../common/chips/tag';
import ProgressBar from '../common/progressBar';
import RenderOverlay from '../common/renderOverlay';

export default function ListCard({
  image,
  registrationEnd,
  participantCount,
  capacity,
  name,
  location,
  dateTime,
}: IGetJoinedGatherings) {
  function isClose() {
    if (isClosedUtil(registrationEnd, participantCount, capacity)) {
      return RenderOverlay('마감', 'full', 0);
    }
    return null;
  }

  return (
    <div className="bg-white w-[343px] sm:w-full max-w-[996px] h-[316px] sm:h-[156px] rounded-3xl flex sm:flex-row flex-col overflow-hidden border-2 border-gray-100 relative">
      {/* 마감 오버레이 */}
      {isClose()}

      {/* 모임 이미지 */}
      <div className="w-[343px] sm:w-[280px] h-[156px] flex items-center justify-center overflow-hidden relative">
        <Image src={image} alt="모임 대표 이미지" className="object-cover" />
        <CloseTag registrationEnd={registrationEnd} />
      </div>

      {/* 모임 정보 */}
      <div className="relative sm:w-[716px] w-full h-[156px] sm:pl-6 pl-2">
        <button type="button" className="absolute top-5 right-5">
          <Image src="/emptyHeart.svg" alt="찜 버튼" /> {/* 기능 구현 필요함(찜하기) */}
        </button>

        <div className="h-[96px] flex items-center">
          <div className="w-[270px] h-[60px] flex flex-col">
            <div className="flex">
              <p className="w-[180px] font-semibold overflow-hidden truncate mt-0.5">{name}</p>
              <span className="font-semibold mx-1">|</span>
              <p className="font-medium text-xs mt-1.5">{location}</p>
            </div>
            <div className="mt-2">
              <DateTimeInfoChip dateTime={dateTime} />
            </div>
          </div>
        </div>

        {/* 모임 인원 정보 */}
        <div className="h-[60px] max-w-[calc(100%-120px)]">
          <div className="w-full h-1/2 flex">
            <span className="flex gap-[4px] mt-1">
              <Image src="/personIcon.svg" className="w-4 h-4 mt-1" alt="참여자 아이콘" />
              {`${participantCount}/${capacity}`}
            </span>
            {ApproveCheck(participantCount)}
          </div>
          <div className="w-full h-2 flex items-center">
            {ProgressBar(participantCount, capacity)}
          </div>
        </div>

        {/* 클릭 하면 상세페이지로 이동(구현X) */}
        <button
          type="button"
          className="flex text-orange-600 font-semibold absolute bottom-5 right-5"
        >
          <p>join now</p>
          <Image className="w-4 h-4 mt-1 ml-2" src="/arrowIcon.svg" alt="화살표 아이콘" />
        </button>
      </div>
    </div>
  );
}
