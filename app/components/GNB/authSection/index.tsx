'use client';

import Link from 'next/link';

import {PROFILE_INFO} from '../../../constants/service';
import {useClearAuthByPageType} from '../../../hooks/useAuth';
import {useCustomRouter} from '../../../hooks/useRouter';
import {useUserInfoQuery} from '../../../queries/user/useUserQueries';

import ProfileButton from './profileButton';

function AuthSection() {
  // UserInfo
  // - cache userInfo
  const {userInfo: cachedUserInfo} = useUserInfoQuery();
  // - storage userInfo
  const storageUserInfoString = sessionStorage.getItem(PROFILE_INFO) || '';
  const storageUserInfo = storageUserInfoString ? JSON.parse(storageUserInfoString) : null;
  // - final userInfo
  const userInfo = storageUserInfo || cachedUserInfo;

  const {pageType} = useCustomRouter();
  useClearAuthByPageType();

  return (
    <div className="relative flex items-center self-center">
      {pageType !== 'guestOnly' && userInfo ? (
        <ProfileButton profileInfo={userInfo} />
      ) : (
        <Link
          href="/login"
          className="flex items-center gap-6 self-center text-sm font-semibold text-white tablet:text-base"
        >
          로그인
        </Link>
      )}
    </div>
  );
}

export default AuthSection;
