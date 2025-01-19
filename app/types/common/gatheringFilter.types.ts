import {Dispatch, SetStateAction} from 'react';

export type Gathering = 'DALLAEMFIT' | 'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';

export type GatheringFilterProps = {
  gatheringType: Gathering;
  setGatheringType: Dispatch<SetStateAction<Gathering>>;
};
