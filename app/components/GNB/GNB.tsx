import {Suspense} from 'react';

import LogoImage from './LogoImage';
import AuthSection from './authSection';
import NavItemList from './navItemList';

export function GNB() {
  return (
    <section className="fixed top-0 z-50 w-full border-b-2 border-gray-900 bg-orange-600">
      <nav className="mx-auto flex h-14 max-w-screen-desktop px-4 tablet:px-6 desktop:p-0">
        <LogoImage />
        <NavItemList />
        {/* useSearchParams 사용 시 페이지 전체가 csr로 변하는 문제를 해결하기 위한 boundary 설정 */}
        <Suspense>
          <AuthSection />
        </Suspense>
      </nav>
    </section>
  );
}
