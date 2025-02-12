import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';

import {getGatheringsInServer} from '../apis/gatherings/gatheringApi';
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GatheringsList initialData={initialData} />
    </HydrationBoundary>
  );
}
