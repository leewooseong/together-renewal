'use client';

import {useState} from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {TABLET} from '../../constants/mediaQuery';
import {PATH_LIST} from '../../constants/route';
import {useClearAuth} from '../../hooks/useAuth';

// Todo: intersection observer를 이용해서 모달이 잘릴 것 같으면 위치 재조정하기
export function GNB() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const {clearAuth} = useClearAuth();

  const handleDropDownClick = () => {
    setIsOpen(prev => !prev);
  };

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await clearAuth();
    setIsOpen(false);
  };

  return (
    <section className="fixed top-0 w-full border-b-2 border-gray-900 bg-orange-600">
      <nav className="mx-auto flex h-14 max-w-screen-desktop px-4 tablet:px-6 desktop:p-0">
        <Link href="/" className="self-center">
          <picture>
            <source
              media={`(min-width: ${TABLET})`}
              srcSet="/images/logo/size=large.svg"
              width={73}
              height={35}
            />
            <Image
              src="/images/logo/size=small.svg"
              alt="큰 로고 이미지"
              width={56}
              height={27}
              unoptimized
            />
          </picture>
        </Link>
        <ul className="flex grow items-center gap-3 px-3 text-sm font-semibold text-orange-50 tablet:px-5 tablet:text-base">
          {PATH_LIST.map(navItem => (
            <li key={navItem.path}>
              <Link
                href={navItem.path}
                className={clsx('hover:text-orange-200', {
                  'text-gray-900 hover:text-gray-900': currentPath === navItem.path,
                })}
              >
                {navItem.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* <Link
          href="/login"
          className="flex items-center gap-6 self-center text-sm font-semibold text-white tablet:text-base"
        >
          로그인
        </Link> */}
        <div className="relative size-10 self-center">
          {isOpen && (
            <div
              className="fixed inset-0 z-30 bg-transparent"
              onClick={handleBackdropClick}
              aria-hidden="true"
            />
          )}
          <button type="button" onClick={handleDropDownClick} className="z-40">
            <Image
              src="/images/profile/size=Large, state=Default.svg"
              alt="큰 로고 이미지"
              width={73}
              height={35}
              unoptimized
            />
          </button>
          {isOpen && (
            <ul className="absolute right-0 top-[calc(100%+6px)] z-40 w-[110px] overflow-hidden rounded-[12px] bg-gray-50 text-sm font-medium text-gray-800 desktop:left-0 desktop:w-[142px] desktop:text-base">
              <li className="px-4 py-[10px] hover:bg-gray-100">
                <Link href="/mypage" onClick={handleDropDownClick}>
                  마이페이지
                </Link>
              </li>
              <li className="px-4 py-[10px] hover:bg-gray-100">
                <button type="button" onClick={handleLogout}>
                  로그아웃
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </section>
  );
}
