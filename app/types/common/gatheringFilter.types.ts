import {Dispatch, SetStateAction} from 'react';

import {GetReviewsProps} from '../reviews/reviewsApi.types';

export type Gathering = 'DALLAEMFIT' | 'ALL' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';

export type GatheringWithoutAll = Exclude<Gathering, 'ALL'>;

export type GatheringFilterProps = {
  setFilter: Dispatch<SetStateAction<GetReviewsProps>>;
  filter: GetReviewsProps;
  updateQueryString: (newFilter: GetReviewsProps) => void;
};

// export type RequiredGetReviewsProps = Required<GetReviewsProps>;
