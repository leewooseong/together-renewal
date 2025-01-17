import {Metadata} from 'next';

import {CreateModalCalendar} from '../components/common/calendar/createModalCalendar';

export const metadata: Metadata = {
  title: '서비스 명',
  description: '서비스 메인 페이지 설명',
};

export default async function Home() {
  return (
    <div>
      <CreateModalCalendar />
      <p>메인 페이지</p>
    </div>
  );
}
