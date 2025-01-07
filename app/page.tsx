import {Metadata} from 'next';
import LogoutButton from './components/logoutButton';

export const metadata: Metadata = {
  title: '서비스 명',
  description: '서비스 메인 페이지 설명',
};

export default function Home() {
  return (
    <div>
      <p>메인 페이지</p>
      <LogoutButton />
    </div>
  );
}
