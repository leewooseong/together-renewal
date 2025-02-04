type BottomBarType = {
  isOwner: boolean;
};

export default function BottomBar({isOwner}: BottomBarType) {
  return (
    <div
      className={`fixed bottom-0 left-0 z-10 w-full border-t-2 border-t-gray-900 bg-white px-4 py-5 sm:h-[84px] sm:justify-center sm:px-6 ${isOwner ? 'h-auto sm:flex' : 'flex h-auto justify-between'}`}
    >
      <div
        className={`md:w-[996px] ${isOwner ? 'grid grid-rows-2 gap-[10px] sm:flex sm:justify-between' : 'flex items-center justify-between gap-6'}`}
      >
        <div className="flex flex-col justify-between gap-1">
          <div className="text-sm font-semibold text-gray-900 sm:text-base">
            더 건강한 나와 팀을 위한 프로그램🏃
          </div>
          <div className="text-xs text-gray-700">
            {isOwner
              ? '모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요'
              : '국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요'}
          </div>
        </div>
        <div className={`${isOwner ? 'flex gap-2 sm:w-[238px]' : 'flex justify-end'} `}>
          {isOwner ? (
            <>
              <button
                type="button"
                className="h-11 flex-1 rounded-xl border border-orange-600 font-semibold text-orange-600"
              >
                취소하기
              </button>
              <button
                type="button"
                className="h-11 flex-1 rounded-xl bg-orange-600 font-semibold text-white"
              >
                공유하기
              </button>
            </>
          ) : (
            <button
              type="button"
              className="h-11 w-[115px] rounded-xl bg-orange-600 font-semibold text-white"
            >
              참여하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
