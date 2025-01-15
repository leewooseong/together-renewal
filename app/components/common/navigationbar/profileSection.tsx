'use client';

import {useEffect, useRef, useState} from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import {PROFILE_DROPDOWN} from '../../../constants/style';
import {useClearAuth} from '../../../hooks/useAuth';

function ProfileSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDropdownSpace, setHasDropdownSpace] = useState(true);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const {clearAuth} = useClearAuth();

  useEffect(() => {
    if (!isOpen || !profileButtonRef.current) return undefined;

    const dropdownObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setHasDropdownSpace(true);
          } else {
            setHasDropdownSpace(false);
          }
        });
      },
      {rootMargin: `0px -${PROFILE_DROPDOWN} 0px 0px `},
    );

    dropdownObserver.observe(profileButtonRef.current);

    return () => {
      dropdownObserver.disconnect();
    };
  }, [isOpen]);

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
    <div className="relative size-10 self-center">
      {/* <Link
          href="/login"
          className="flex items-center gap-6 self-center text-sm font-semibold text-white tablet:text-base"
        >
          로그인
        </Link> */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
      <button type="button" ref={profileButtonRef} onClick={handleDropDownClick} className="z-40">
        <Image
          src="/images/profile/size=Large, state=Default.svg"
          alt="큰 로고 이미지"
          width={73}
          height={35}
          unoptimized
        />
      </button>
      {isOpen && (
        <ul
          className={clsx(
            'absolute top-[calc(100%+6px)] z-40 w-[110px] overflow-hidden rounded-[12px] bg-gray-50 text-sm font-medium text-gray-800 desktop:w-[profileDropdown] desktop:text-base',
            {'left-0': hasDropdownSpace},
            {'right-0': !hasDropdownSpace},
          )}
        >
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
  );
}

export default ProfileSection;
