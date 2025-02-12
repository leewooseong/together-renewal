import {Metadata} from 'next';

import {CreateGatheringButton} from '../components/createGatheringModal/createGatheringButton';

export const metadata: Metadata = {
  title: '서비스 명',
  description: '서비스 메인 페이지 설명',
};

export default async function Home() {
  return (
    <div>
      <CreateGatheringButton />
    </div>
  );
}
