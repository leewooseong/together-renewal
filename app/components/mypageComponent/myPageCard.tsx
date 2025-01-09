'use client';

import {useState} from 'react';

import Image from 'next/image';

import formatDateUtil from '../../utils/formatDateUtil';
import RenderOverlay from '../common/renderOverlay';
import WriteReviewModal from '../modals/writeReviewModal';

import RenderButton from './actionButton';
import RenderChips from './chipRender';

interface MyPageCardProps extends IGetJoinedGatherings {
  isMyGathering: boolean;
}

/** 마이페이지 - 나의모임 card */
export default function MyPageCard({isMyGathering, ...props}: MyPageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function isCanceled() {
    if (props.canceledAt) return RenderOverlay('모집 취소', '[328px]', props.id);
    if (new Date(props.dateTime) < new Date()) return RenderOverlay('마감', '[328px]', props.id);
    return null;
  }

  const dateFormat = formatDateUtil(props.dateTime);

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기 상태로 변경
  };
  return (
    <div className="relative flex flex-col sm:flex-col justify-between w-[311px] sm:w-full max-w-[996px] h-[352px] sm:h-[180px]">
      {/* 리뷰 작성 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <WriteReviewModal onClose={() => setIsModalOpen(false)} gatheringId={props.id} />
        </div>
      )}

      {/* 모임 취소 오버레이 */}
      {isCanceled()}

      <div className="flex flex-col justify-between sm:flex-row w-full h-[328px] sm:w-[545px] sm:h-[156px]">
        {/* 모임 이미지 */}
        <div className="sm:w-[280px] w-full h-full flex items-center justify-center overflow-hidden border border-dashed rounded-3xl">
          <Image src={props.image} alt="모임 대표 이미지" className="object-cover" />
        </div>

        <div className="w-[249px] h-full flex flex-col justify-between">
          {/* 상태 Chips */}
          <RenderChips
            isCompleted={props.isCompleted}
            participantCount={props.participantCount}
            isMyGathering={isMyGathering}
          />

          {/* 모임 정보 */}
          <div className="w-full h-[54px] flex flex-col justify-between">
            {/* 모임 이름, 장소 */}
            <div className="h-[28px] flex justify-between items-center">
              <div className="w-[170px] font-semibold overflow-hidden truncate">{props.name}</div>
              <div className="w-[76px] flex justify-between">
                <span className="font-semibold">|</span>
                <p className="font-medium text-sm">{props.location}</p>
              </div>
            </div>

            {/* 날짜, 참여 인원 */}
            <div className="h-[20px] w-[160px] flex justify-between text-sm">
              <span>{`${dateFormat.date} ${dateFormat.time}`}</span>
              <span className="flex gap-[4px]">
                <Image src="/personIcon.svg" className="pt-0.5" alt="사람 아이콘" />
                {`${props.participantCount}/${props.capacity}`}
              </span>
            </div>
          </div>

          {/* 취소, 리뷰 버튼 */}
          <div className="h-[40px] mt-[12px]">
            <RenderButton
              id={props.id}
              state={props.isCompleted}
              review={props.isReviewed}
              onOpenModal={handleOpenModal}
            />
          </div>
        </div>
      </div>

      {/* 하단 점선 */}
      <div className="w-full custom-dotted-line" />
    </div>
  );
}
