import {useState} from 'react';

import {Gathering} from '../types/common/gatheringFilter.types';

export function useGatheringFilter() {
  const [gatheringType, setGatheringType] = useState<Gathering>('DALLAEMFIT');

  return {gatheringType, setGatheringType};
}
