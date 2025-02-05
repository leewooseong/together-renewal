import {getGatheringsInServer} from '../apis/gatherings/gatheringApi';
import GatheringsList from '../components/listComponent/gatheringsList';
import {GatheringParams} from '../types/gatherings/getGatherings.types';

export default async function Home() {
  const initialParams: GatheringParams = {
    sortBy: 'dateTime',
    sortOrder: 'asc',
    limit: 10,
    offset: 0,
  };

  const initialData = await getGatheringsInServer(initialParams);

  return <GatheringsList initialData={initialData} />;
}
