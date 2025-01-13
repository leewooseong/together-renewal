'use client';

import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/mypage'); // /mypage로 이동
  };

  return (
    <div>
      <p>메인 페이지</p>
      <button type="button" onClick={handleClick}>
        마이페이지
      </button>
    </div>
  );
}
