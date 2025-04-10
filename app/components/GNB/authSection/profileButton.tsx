import {useEffect, useRef, useState} from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {PROFILE_DROPDOWN} from '../../../constants/mediaQuery';
import {useUserMutation} from '../../../queries/user/useUserMutations';
import {User} from '../../../types/users/user.types';

type ProfileButtonProps = {
  profileInfo: User;
};
function ProfileButton({profileInfo}: ProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDropdownSpace, setHasDropdownSpace] = useState(true);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const {logout} = useUserMutation();
  const {mutate} = logout();

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
    mutate();
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        ref={profileButtonRef}
        onClick={handleDropDownClick}
        className="z-40 size-10"
      >
        <Image
          src={profileInfo.image || '/images/profile/size=Large, state=Default.svg'}
          alt="큰 로고 이미지"
          width={73}
          height={35}
          unoptimized
          className="rounded-full"
        />
      </button>
      {isOpen && (
        <>
          <ul
            className={clsx(
              'absolute top-[calc(100%+6px)] z-40 w-[110px] overflow-hidden rounded-[12px] bg-gray-50 text-sm font-medium text-gray-800 desktop:w-[profileDropdown] desktop:text-base',
              {'left-0': hasDropdownSpace},
              {'right-0': !hasDropdownSpace},
            )}
          >
            <li className="px-4 py-[10px] hover:bg-gray-100">
              <button
                type="button"
                onClick={() => {
                  handleDropDownClick();
                  router.push('/mypage');
                  router.refresh(); // Router cache로 인해 middleware가 동작하지 않게 되어, middleware가 필요한 페이지의 경우 router.refresh 사용
                }}
              >
                마이페이지
              </button>
            </li>
            <li className="px-4 py-[10px] hover:bg-gray-100">
              <button type="button" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          </ul>
          {/* Dropdown backdrop */}
          <div
            className="fixed inset-0 z-30 bg-transparent"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
}

export default ProfileButton;
