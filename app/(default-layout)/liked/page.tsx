'use client';

import {Suspense} from 'react';

import {getGatheringsInServer} from '../../apis/gatherings/gatheringApi';
import {TextRender} from '../../components/common/textRender';
import {LikedContents} from '../../components/liked/likedContents';
import {GatheringsFilter} from '../../types/gatherings/filters';
import {GetGatherings} from '../../types/gatherings/getGatherings.types';

// TODO: fetchGatheringsData 분리
const fetchGatheringsData = async () => {
  const initialParams: GatheringsFilter = {
    id: '0',
    sortBy: 'dateTime',
    sortOrder: 'asc',
    limit: 10,
    offset: 0,
  };
  const initialData: GetGatherings[] = await getGatheringsInServer(initialParams);
  return initialData;
};

export default async function likedPage() {
  const initialData = await fetchGatheringsData();

  return (
    <Suspense fallback={<TextRender effect="bounce" text="페이지 로딩 중..." />}>
      <LikedContents initialData={initialData} />
    </Suspense>
  );
}
