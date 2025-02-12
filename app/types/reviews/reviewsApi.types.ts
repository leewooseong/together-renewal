export type GetReviewsProps = {
  type?: string;
  location?: string;
  date?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type GetMyReviewsProps = {
  userId: number;
  sortOrder: string;
};

export type GetGatheringReviewsProps = {
  gatheringId: number;
  sortOrder: string;
};
