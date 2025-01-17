import {Gathering} from '../common/gatheringFilter.types';

// 나중에  더 안전하게 수정필요
export type GetReviewsProps = {
  userId?: number;
  gatheringId?: number;
  gatheringType?: string;
  location?: string;
  date?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type GatheringWithoutAll = Exclude<Gathering, 'ALL'>;
