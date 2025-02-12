import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';

import {getGatheringsInServer} from '../apis/gatherings/gatheringApi';
import {PageInfo} from '../components/common/pageInfo';
import GatheringsList from '../components/list/gatheringsList';
import {GatheringsFilter} from '../types/gatherings/filters';
import {GetGatherings} from '../types/gatherings/getGatherings.types';

const fetchGatheringsData = async () => {
  const initialParams: GatheringsFilter = {
    sortBy: 'dateTime',
    sortOrder: 'asc',
    limit: 10,
    offset: 0,
  };
  const initialData: GetGatherings[] = await getGatheringsInServer(initialParams);
  return initialData;
};

export default async function Home() {
  const queryClient = new QueryClient();

  const initialData = await fetchGatheringsData();

  queryClient.setQueryData(['gatherings'], {
    pages: [initialData],
    pageParams: [0],
  });

  return (
    <div>
      <div className="mb-6 tablet:mb-8">
        <PageInfo pageName="gatherings" />
      </div>
      {/* 무한스크롤 + 필터링 */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GatheringsList initialData={initialData} />
      </HydrationBoundary>
    </div>
  );
}