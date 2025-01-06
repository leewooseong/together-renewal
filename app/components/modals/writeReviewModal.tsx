export function WriteReviewModal({onClose}: {onClose: () => void}) {
  return (
    <div className="w-full h-full z-50 items-center justify-center flex absolute">
      <div className="sm:w-[520px] w-[343px] h-[408px] bg-white rounded-md flex items-center justify-center">
        <div className="sm:w-[472px] w-[295px] h-[360px] flex flex-col gap-[24px]">
          <p className="w-full h-[28px] font-semibold text-lg">리뷰 쓰기</p>
          <div className="w-full h-[60px] flex flex-col">
            <p className="font-semibold">만족스러운 경험이었나요?</p>
            <div className="mt-[12px]">하트!</div>
          </div>
          <div className="w-full h-[156px]">
            <p>경험에 대해 남겨주세요</p>
            <textarea
              className="w-full h-[120px] resize-none overflow-auto bg-gray-50 rounded-md font-medium text-sm mt-[12px] p-[10px]"
              placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원분들께 큰 도움이 됩니다."
            />
          </div>
          <div className="w-full h-[44px] gap-[16px] flex">
            <button
              className="flex items-center justify-center w-[228px] h-full font-semibold text-orange-600 border-2 border-orange-600 rounded-md"
              onClick={onClose}
            >
              취소
            </button>
            <button className="flex items-center justify-center w-[228px] h-full font-semibold text-white bg-gray-400 rounded-md">
              리뷰 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
