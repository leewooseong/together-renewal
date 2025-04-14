'use client';

import Link from 'next/link';

import {useClearAuthByPageType} from '../../../hooks/useAuth';
import {useCustomRouter} from '../../../hooks/useRouter';
import {useUserInfoWithStorage} from '../../../hooks/useUser';
import {ClientOnly} from '../../common/clientOnly';

import ProfileButton from './profileButton';

function AuthSection() {
  const {userInfo} = useUserInfoWithStorage();
  const {pageType} = useCustomRouter();
  useClearAuthByPageType();

  return (
    <div className="relative flex items-center self-center">
      <ClientOnly>
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
      </ClientOnly>
    </div>
  );
}

export default AuthSection;
