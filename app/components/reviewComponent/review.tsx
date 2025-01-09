import Image from 'next/image';

import {ReviewScore} from '@/app/components/reviewComponent/reviewScore';
import {IReviewComponentType} from '@/app/types/reviews.types';

// 마이페이지-나의 리뷰는 pageName = ""MY_PAGE"를 보내야함.
// 모임 상세 페에지는 pageName = "GATHERING"을 보내야함.

export default function Review({
  gatheringImg,
  score,
  comment,
  gatheringType,
  gatheringLocation,
  userImg,
  userName,
  createdAt,
  pageName,
}: IReviewComponentType) {
  const createDate: string = createdAt.slice(0, 10).replaceAll('-', '.');

  return (
    <div
      className={`grid grid-rows-1 w-[311px] sm:w-full  ${pageName === 'GATHERING' ? 'sm:grid-cols-1' : 'sm:grid-cols-[280px_minmax(0,_1fr)]'} gap-6 box-border`}
    >
      {pageName !== 'GATHERING' &&
        (!gatheringImg ? (
          <div className="bg-neutral-800 w-[311px] sm:w-[280px] h-[156px] rounded-3xl" />
        ) : (
          <div className="relative w-[311px] sm:w-[280px] h-[156px] rounded-3xl overflow-hidden">
            <Image
              src={gatheringImg}
              alt="모임 이미지"
              fill
              sizes="(max-width: 768px) 311px, 280px"
              className="object-cover"
            />
          </div>
        ))}
      <div className=" flex flex-col pb-5 border-b-2 border-gray-200 border-dashed sm:px-0">
        <ReviewScore score={score} />
        <p className="text-sm pt-2.5">{comment}</p>
        {pageName === 'GATHERING' ? (
          ''
        ) : (
          <div className="pt-2.5 text-sm">{`${gatheringType} · ${gatheringLocation}`}</div>
        )}
        <div className="pt-2 flex  items-center text-sm">
          {pageName === 'MY_PAGE' ? (
            ''
          ) : (
            <div className="flex items-center">
              {!userImg ? (
                <Image src="/profile-default.svg" alt="기본 프로필 이미지" width={24} height={24} />
              ) : (
                <Image
                  src={userImg}
                  alt="프로필 이미지지"
                  className="bg-yellow-400 w-6 h-6 rounded-full"
                />
              )}
              <span className="pl-2">{userName}</span>
            </div>
          )}
          {pageName === 'MY_PAGE' ? '' : <div className="pl-2 pr-3">|</div>}
          <div className="text-gray-500">{createDate}</div>
        </div>
      </div>
    </div>
  );
}
