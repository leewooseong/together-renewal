import Image from 'next/image';

import {IpageInfoType} from '../types/pageInfo.types';

export default function PageInfo({pageName}: IpageInfoType) {
  return (
    <div className="flex items-center gap-4 xs:gap-[7px]">
      <Image src={`/${pageName}-page-head.png`} alt="페이지 로고" />
      <div
        className={`flex  gap-2 h-[60px] ${pageName === 'gatherings' ? 'flex-col-reverse' : 'flex-col'}`}
      >
        <h1 className="text-lg font-semibold text-gray-900 xs:text-2xl">
          {pageName === 'gatherings' && '지금 모임에 참여해보세요'}
          {pageName === 'reviews' && '모든 리뷰'}
          {pageName === 'likes' && '찜한 모임'}
        </h1>
        <p className="text-sm font-medium text-gray-700">
          {pageName === 'gatherings' && '함께 할 사람이 없나요?'}
          {pageName === 'reviews' && '같이 달램을 이용한 분들은 이렇게 느꼈어요😉'}
          {pageName === 'likes' && '마감되기 전에 지금 바로 참여해보세요🤓'}
        </p>
      </div>
    </div>
  );
}
