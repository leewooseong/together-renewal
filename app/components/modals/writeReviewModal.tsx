import {useState} from 'react';

import Image from 'next/image';

import writeReviewsApi from '@/app/apis/writeReviewsApi';

import InputTextBox from '../common/inputText';

export default function WriteReviewModal({
  onClose,
  gatheringId,
}: {
  onClose: () => void;
  gatheringId: number;
}) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    /// ////////////////////////////////////모달로 변경
    try {
      if (!comment.trim()) {
        alert('리뷰를 입력해주세요!');
        return;
      }
      if (rating <= 0) {
        alert('별점을 선택해주세요!');
        return;
      }
      await writeReviewsApi(gatheringId, rating, comment);
      alert('리뷰가 등록되었습니다.');
      onClose();
    } catch (error) {
      console.error('리뷰 등록 중 오류 발생:', error);
      alert('리뷰 등록에 실패했습니다.');
    }
  };
  return (
    <div className="w-full h-full z-50 items-center justify-center flex absolute">
      <div className="sm:w-[520px] w-[343px] h-[408px] bg-white rounded-md flex items-center justify-center">
        <div className="sm:w-[472px] w-[295px] h-[360px] flex flex-col gap-[24px]">
          <p className="w-full h-[28px] font-semibold text-lg">리뷰 쓰기</p>
          <div className="w-full h-[60px] flex flex-col">
            <p className="font-semibold">만족스러운 경험이었나요?</p>
            <div className="mt-[12px] flex">
              {[1, 2, 3, 4, 5].map(heart => (
                <button
                  key={heart}
                  type="button"
                  onClick={() => setRating(heart)}
                  style={{cursor: 'pointer', background: 'none', border: 'none', padding: 0}}
                  aria-label={`Rate ${heart} hearts`}
                >
                  <Image
                    src={heart <= rating ? '/heart-active.svg' : '/heart-default.svg'}
                    alt="하트"
                    width={24}
                    height={24}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="w-full h-[156px]">
            <p>경험에 대해 남겨주세요</p>
            <InputTextBox
              placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원분들께 큰 도움이 됩니다."
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            />
          </div>
          <div className="w-full h-[44px] gap-[16px] flex">
            <button
              type="button"
              className="flex items-center justify-center w-[228px] h-full font-semibold text-orange-600 border-2 border-orange-600 rounded-md"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-[228px] h-full font-semibold text-white bg-gray-400 rounded-md"
              onClick={handleSubmit}
            >
              리뷰 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
