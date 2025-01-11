import {useState} from 'react';
import {Gathering} from '../types/gatheringFilter.types';

export function useGatheringFilter() {
  const [gatheringType, setGatheringType] = useState<Gathering>('DALLAEMFIT');

  return {gatheringType, setGatheringType};
}
