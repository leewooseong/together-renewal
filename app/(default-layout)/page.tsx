import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import { CreateModalCalendar } from '../components/common/calendar/createModalCalendar';

export const metadata: Metadata = {
  title: '서비스 명',
  description: '서비스 메인 페이지 설명',
};

const DynamicCalendar = dynamic(
  () =>
    import('../components/common/calendar/createModalCalendar').then(
      mod => mod.CreateModalCalendar,
    ),
  {
    // loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

export default async function Home() {
  return (
    <div>
      {/* <CreateModalCalendar/> */}
      <DynamicCalendar />
    </div>
  );
}
