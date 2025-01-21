import Image from 'next/image';
import Link from 'next/link';

import {LogoutButton} from '../user/logoutButton';

export function GNB() {
  return (
    <section className="fixed top-0 z-50 w-full border-b-2 border-gray-900 bg-orange-600">
      <nav className="mx-auto flex h-14 max-w-screen-desktop px-4 tablet:px-6 desktop:p-0">
        <Link href="/" className="self-center">
          {/* <Image
            src="/images/size=small.svg"
            alt="작은 로고 이미지"
            width={56}
            height={27}
            unoptimized
          /> */}
          <Image
            src="/images/logo/size=large.svg"
            alt="큰 로고 이미지"
            width={73}
            height={35}
            unoptimized
          />
        </Link>
        <ul className="flex grow items-center gap-3 px-3 text-sm font-semibold text-orange-50 tablet:px-5 tablet:text-base">
          <li className="hover:text-orange-200">
            <Link href="/">모임 찾기</Link>
          </li>
          <li className="hover:text-orange-200">
            <Link href="/zzim">찜한 모임</Link>
          </li>
          <li className="hover:text-orange-200">
            <Link href="reviews">모든 리뷰</Link>
          </li>
        </ul>

        {/* <Link
          href="/login"
          className="flex items-center gap-6 self-center text-sm font-semibold text-white tablet:text-base"
        >
          로그인
        </Link> */}
        <div className="relative size-10 self-center">
          <button type="button" className="">
            <Image
              src="/images/profile/size=Large, state=Default.svg"
              alt="큰 로고 이미지"
              width={73}
              height={35}
              unoptimized
            />
          </button>
          {/* Todo: intersection observer를 이용해서 모달이 잘릴 것 같으면 위치 재조정하기 */}
          <ul className="absolute right-0 top-[calc(100%+6px)] w-[110px] overflow-hidden rounded-[12px] bg-gray-50 text-sm font-medium text-gray-800 desktop:w-[142px] desktop:text-base">
            <li className="px-4 py-[10px] hover:bg-gray-100">
              <Link href="/mypage">마이페이지</Link>
            </li>
            <li className="px-4 py-[10px] hover:bg-gray-100">
              <LogoutButton />
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
}
