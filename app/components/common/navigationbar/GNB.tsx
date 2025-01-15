import Image from 'next/image';
import Link from 'next/link';

import {TABLET} from '../../../constants/style';

import NavItemList from './navItemList';
import ProfileSection from './profileSection';

export function GNB() {
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
        <NavItemList />
        <ProfileSection />
      </nav>
    </section>
  );
}
