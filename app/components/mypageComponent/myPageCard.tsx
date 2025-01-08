'use client';

import {useState} from 'react';
import {leaveGatheringsApi} from '../../apis/leaveGatheringsApi';
import {formatDateUtil} from '../../utils/formatDateUtil';
import {
  EventApproved,
  ReservationFinishedChip,
  UpcomingReservationChip,
  WaitingForApproval,
} from '../common/chips/chip-state';
import {RenderOverlay} from '../common/renderOverlay';
import {WriteReviewModal} from '../modals/writeReviewModal';

interface MyPageCardProps extends IGetJoinedGatherings {
  isMyGathering: boolean;
}

/** 마이페이지 - 나의모임 card */
export default function MyPageCard({isMyGathering, ...param}: MyPageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const RenderButton: React.FC<{state: boolean; review: boolean}> = ({state, review}) => {
    const baseStyle = 'w-[120px] h-[40px] rounded-xl font-semibold text-sm';

    if (state && review) {
      return null;
    }

    const label = state ? '리뷰 작성하기' : '예약 취소하기';
    const handleButton = async () => {
      try {
        if (state) {
          setIsModalOpen(true);
        } else {
          await leaveGatheringsApi(param.id);
          window.location.href = '/mypage';
        }
      } catch {
        console.error('API 호출 에러:');
      }
    };
    const style = state
      ? 'bg-orange-600 text-white'
      : 'bg-white text-orange-600 border-2 border-orange-500';

    return (
      <button className={`${baseStyle} ${style}`} onClick={handleButton}>
        {label}
      </button>
    );
  };

  const RenderChips = (
    isCompleted: boolean,
    participantCount: number,
    isMyGathering: boolean | undefined,
  ) => {
    if (!isMyGathering) {
      return null;
    }

    return (
      <div className="flex w-full h-[50px] pt-[8px] gap-[8px] justify-start">
        {isCompleted ? (
          <ReservationFinishedChip />
        ) : (
          <>
            <UpcomingReservationChip />
            {participantCount >= 5 ? <EventApproved /> : <WaitingForApproval />}
          </>
        )}
      </div>
    );
  };

  function isCanceled() {
    if (param.canceledAt) return RenderOverlay('모집 취소', '[328px]', param.id);
    if (new Date(param.dateTime) < new Date()) return RenderOverlay('마감', '[328px]', param.id);
    return null;
  }

  const dateFormat = formatDateUtil(param.dateTime);

  return (
    <div className="relative flex flex-col sm:flex-col justify-between w-[311px] sm:w-full max-w-[996px] h-[352px] sm:h-[180px]">
      {/* 리뷰 작성 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <WriteReviewModal onClose={() => setIsModalOpen(false)} gatheringId={param.id} />
        </div>
      )}

      {/* 모임 취소 오버레이 */}
      {isCanceled()}

      <div className="flex flex-col justify-between sm:flex-row w-full h-[328px] sm:w-[545px] sm:h-[156px]">
        {/* 모임 이미지 */}
        <div className="sm:w-[280px] w-full h-full flex items-center justify-center overflow-hidden border border-dashed rounded-3xl">
          <img src={param.image} alt="모임 대표 이미지" className="object-cover" />
        </div>

        <div className="w-[249px] h-full flex flex-col justify-between">
          {/* 상태 Chips */}
          {RenderChips(param.isCompleted, param.participantCount, isMyGathering)}

          {/* 모임 정보 */}
          <div className="w-full h-[54px] flex flex-col justify-between">
            {/* 모임 이름, 장소 */}
            <div className="h-[28px] flex justify-between items-center">
              <div className="w-[170px] font-semibold overflow-hidden truncate">{param.name}</div>
              <div className="w-[76px] flex justify-between">
                <span className="font-semibold">{'|'}</span>
                <p className="font-medium text-sm">{param.location}</p>
              </div>
            </div>

            {/* 날짜, 참여 인원 */}
            <div className="h-[20px] w-[160px] flex justify-between text-sm">
              <span>{`${dateFormat.date} ${dateFormat.time}`}</span>
              <span className="flex gap-[4px]">
                <img src="/personIcon.svg" className="pt-0.5" />
                {`${param.participantCount}/${param.capacity}`}
              </span>
            </div>
          </div>

          {/* 취소, 리뷰 버튼 */}
          <div className="h-[40px] mt-[12px]">
            <RenderButton state={param.isCompleted} review={param.isReviewed} />
          </div>
        </div>
      </div>

      {/* 하단 점선 */}
      <div className="w-full custom-dotted-line" />
    </div>
  );
}
