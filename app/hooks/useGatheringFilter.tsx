import {useState} from 'react';

import {Gathering} from '../types/common/gatheringFilter.types';

export function useGatheringFilter() {
  const [type, setType] = useState<Gathering>('DALLAEMFIT');

  return {type, setType};
}
