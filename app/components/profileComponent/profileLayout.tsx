'use client';

import {useEffect, useState} from 'react';

import Image from 'next/image';

import {getUserInfo} from '../../apis/user/userApi';
import {User} from '../../store/types/user.types';

export default function ProfileLayout() {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  function userImg(img: string | undefined) {
    if (!img) {
      return 'icons/defaultProfileIcon.svg';
    }
    return img;
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userinfo = await getUserInfo();
        if (userinfo) {
          setUserInfo((userinfo as unknown as {data: User}).data);
        } else {
          setUserInfo(null);
        }
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
      <div className="absolute left-[24px] right-[18px] top-[54px] z-10 size-[56px] rounded-full bg-none">
        <Image src={userImg(userInfo.image)} alt="프로필 이미지" layout="fill" />
      </div>

      <div className="relative flex h-[66px] w-full bg-orange-400">
        <p className="ml-[24px] mt-[15px] text-lg font-semibold">내 프로필</p>
        <button type="button" aria-label="Edit Profile">
          <Image
            src="icons/editIcon.svg"
            className="absolute right-[18px] top-[18px] z-10"
            alt="수정 아이콘"
            width={32}
            height={32}
            unoptimized
          />
        </button>
        <Image
          src="icons/profileBar.svg"
          className="md:left-[70%] absolute left-[60%] mt-[13px] -translate-x-1/2"
          alt="프로필 상단 이미지"
          width={156}
          height={46}
          unoptimized
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
