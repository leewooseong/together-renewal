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
import {RenderOverlay} from '../common/RenderOverlay';
import {WriteReviewModal} from '../modals/writeReviewModal';

/** 마이페이지 - 나의모임 card */
export default function MyPageCard(props: IGetJoinedGatherings) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const RenderButton: React.FC<{state: boolean; review: boolean}> = ({state, review}) => {
    const baseStyle = 'w-[120px] h-[40px] rounded-xl font-semibold text-sm';

    if (state && review) {
      const handelButton = async () => {
        /////////리뷰 목록 api
        /////////리뷰 보기 모달
      };
      return (
        <button className={`${baseStyle} bg-orange-600 text-white`}>{'내가 쓴 리뷰 보기'}</button>
      );
    }

    const label = state ? '리뷰 작성하기' : '예약 취소하기';
    const handelButton = async () => {
      try {
        if (state) {
          setIsModalOpen(true);
        } else {
          await leaveGatheringsApi(props.id);
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
      <button className={`${baseStyle} ${style}`} onClick={handelButton}>
        {label}
      </button>
    );
  };

  const RenderChips = (isCompleted: boolean, participantCount: number) => (
    <>
      {isCompleted ? (
        <ReservationFinishedChip />
      ) : (
        <>
          <UpcomingReservationChip />
          {participantCount >= 5 ? <EventApproved /> : <WaitingForApproval />}
        </>
      )}
    </>
  );

  function isCanceled() {
    if (props.canceledAt) return RenderOverlay('모집 취소', '[328px]');
    return null;
  }

  const dateFormat = formatDateUtil(props.dateTime);

  return (
    <div className="relative flex flex-col sm:flex-col justify-between w-[311px] sm:w-full max-w-[794px] h-[352px] sm:h-[180px]">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <WriteReviewModal onClose={() => setIsModalOpen(false)} />
        </div>
      )}
      {/* 모임 취소 오버레이 */}
      {isCanceled()}
      <div className="flex flex-col justify-between sm:flex-row w-full h-[328px] sm:w-[545px] sm:h-[156px]">
        {/* 모임 이미지 */}
        <div className="sm:w-[280px] w-full h-full flex items-center justify-center overflow-hidden border border-dashed rounded-3xl">
          <img src={props.image} alt="모임 대표 이미지" className="object-cover" />
        </div>

        <div className="w-[249px] h-full flex flex-col">
          {/* 상태 Chips */}
          <div className="flex w-full h-[50px] pt-[8px] gap-[8px] justify-start">
            {RenderChips(props.isCompleted, props.participantCount)}
          </div>

          {/* 모임 정보 */}
          <div className="w-full h-[54px] flex flex-col justify-between">
            {/* 모임 이름, 장소 */}
            <div className="h-[28px] flex justify-between items-center">
              <div className="w-[170px] font-semibold overflow-hidden truncate">{props.name}</div>
              <div className="w-[76px] flex justify-between">
                <span className="font-semibold">{'|'}</span>
                <p className="font-medium text-sm">{props.location}</p>
              </div>
            </div>

            {/* 날짜, 참여 인원 */}
            <div className="h-[20px] w-[160px] flex justify-between text-sm">
              <span>{`${dateFormat.date} ${dateFormat.time}`}</span>
              <span className="flex gap-[4px]">
                <img src="/personIcon.svg" className="pt-0.5" />
                {`${props.participantCount}/${props.capacity}`}
              </span>
            </div>
          </div>

          {/* 취소, 리뷰 버튼 */}
          <div className="h-[40px] mt-[12px]">
            <RenderButton state={props.isCompleted} review={props.isReviewed} />
          </div>
        </div>
      </div>

      {/* 하단 점선 */}
      <div className="w-full custom-dotted-line" />
    </div>
  );
}
