import {ToastContainer} from 'react-toastify';

import localFont from 'next/font/local';
import 'react-toastify/dist/ReactToastify.css';

import {GNB} from './components/GNB/GNB';
import './globals.css';
import Providers from './providers';

// 폰트 적용
const pretendardSubset = localFont({
  src: [
    {
      path: '/fonts/pretendard-subset/Pretendard-Black.subset.woff2',
      style: 'normal',
      weight: '900',
    },
    {
      path: '/fonts/pretendard-subset/Pretendard-ExtraBold.subset.woff2',
      style: 'normal',
      weight: '800',
    },
    {
      path: '/fonts/pretendard-subset/Pretendard-Bold.subset.woff2',
      style: 'normal',
      weight: '700',
    },
    {
      path: '/fonts/pretendard-subset/Pretendard-SemiBold.subset.woff2',
      style: 'normal',
      weight: '600',
    },
    {
      path: '/fonts/pretendard-subset/Pretendard-Medium.subset.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: '/fonts/pretendard-subset/Pretendard-Regular.subset.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '/fonts/pretendard-subset/Pretendard-Light.subset.woff2',
      style: 'normal',
      weight: '300',
    },
    {
      path: '/fonts/pretendard-subset/Pretendard-ExtraLight.subset.woff2',
      style: 'normal',
      weight: '200',
    },
    {
      path: '/fonts/pretendard-subset/Pretendard-Thin.subset.woff2',
      style: 'normal',
      weight: '100',
    },
  ],
  variable: '--font-pretendard',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${pretendardSubset.className} bg-gray-100`}>
        <Providers>
          <GNB />
          <ToastContainer position="top-center" autoClose={2000} />
          <main className="mx-auto h-screen max-w-screen-desktop pt-14">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
