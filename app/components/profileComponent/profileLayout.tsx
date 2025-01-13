'use client';

import {useEffect, useState} from 'react';

import getUserInfoApi from '@/app/apis/getUserInfoApi';

export default function ProfileLayout() {
  const [userInfo, setUserInfo] = useState<IGetUserInfo | null>(null);

  function userImg(img: string | undefined) {
    if (!img) {
      return '/defaultProfileIcon.svg';
    }
    return img;
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfoApi();
        setUserInfo(data);
      } catch (error) {
        console.error('유저 정보를 불러오는 중 에러 발생:', error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return (
      <div className="flex h-[178px] min-w-[343px] max-w-[996px] items-center justify-center rounded-3xl border-2 border-gray-200 bg-white">
        <p>사용자 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-[178px] min-w-[343px] max-w-[996px] flex-col overflow-hidden rounded-3xl border-2 border-gray-200 bg-white">
      <div className="absolute left-[24px] right-[18px] top-[54px] z-10 h-[56px] w-[56px] rounded-full bg-none">
        <img src={userImg(userInfo.image)} alt="프로필 이미지" />
      </div>

      <div className="relative flex h-[66px] w-full bg-orange-400">
        <p className="ml-[24px] mt-[15px] text-lg font-semibold">내 프로필</p>
        <button type="button" aria-label="Edit Profile">
          <img
            src="/editIcon.svg"
            className="absolute right-[18px] top-[18px] z-10"
            alt="수정 아이콘"
          />
        </button>
        <img
          src="/profileBar.svg"
          className="absolute left-[60%] mt-[13px] -translate-x-1/2 md:left-[70%]"
          alt="프로필 상단 이미지"
        />
        <div className="absolute mt-[60px] w-full border border-orange-600" />
      </div>

      <div className="ml-[92px] mt-[15px] flex h-[77px] w-[240px] flex-col">
        <p>{userInfo.name}</p>
        <div className="mt-[9px] flex h-[44px] w-full flex-col justify-between text-sm">
          <p>{`company. ${userInfo.companyName}`}</p>
          <p className="">{`E-mail.  ${userInfo.email}`}</p>
        </div>
      </div>
    </div>
  );
}
