// TODO: 파일 이름 변경 해야 할거 같습니다(gatheringOptions 등)

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
export type ReviewedGatheringFilter = 'myGatherings' | 'myReviews' | 'createdGatherings';

export type Locations = '건대입구' | '을지로3가' | '신림' | '홍대입구';

export type SortBy = 'dateTime' | 'registrationEnd' | 'participantsCount';
