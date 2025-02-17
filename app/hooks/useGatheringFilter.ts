import {useState} from 'react';

import {Gathering} from '../types/gatherings/gatheringOptions.types';

export function useGatheringFilter() {
  const [type, setType] = useState<Gathering>('DALLAEMFIT');

  return {type, setType};
}
