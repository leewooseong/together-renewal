import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';

import {getGatherings} from '../apis/gatherings/gatheringApi';
import GatheringsList from '../components/listComponent/gatheringsList';
import {GatheringParams, GetGatherings} from '../types/gatherings/getGatherings.types';

export default async function Home() {
  const queryClient = new QueryClient();

  const initialParams: GatheringParams = {
    sortBy: 'dateTime',
    sortOrder: 'asc',
    limit: 10,
    offset: 0,
  };

  const initialData: GetGatherings[] = await getGatherings(initialParams);

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
