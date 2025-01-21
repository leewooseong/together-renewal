import {Gathering} from '../../types/common/gatheringFilter.types';
import {ReviewListType} from '../../types/common/reviews.types';
import {CodeitError} from '../../types/error.types';
import {AverageScoreList} from '../../types/reviews/averageScores.types';
import {
  GetGatheringReviewsProps,
  GetMyReviewsProps,
  GetReviewsProps,
} from '../../types/reviews/reviewsApi.types';
import {clientInstance} from '../client';

export const getReviews = async (props: GetReviewsProps): Promise<ReviewListType> => {
  const queryParams = new URLSearchParams();

  // 선택적 매개변수
  // if (userId) queryParams.append('userId', userId.toString());
  // if (gatheringId) queryParams.append('gatheringId', gatheringId.toString());
  if (props.gatheringType) queryParams.append('type', props.gatheringType);
  if (props.location) queryParams.append('location', props.location);
  if (props.date) queryParams.append('date', props.date);
  if (props.sortBy) queryParams.append('sortBy', props.sortBy);
  if (props.sortOrder) queryParams.append('sortOrder', props.sortOrder);
  try {
    const response = await clientInstance.get<ReviewListType>({
      path: `/route/reviews?${queryParams.toString()}`,
    });
    return response;
  } catch (error) {
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);
      return {
        data: [],
        totalItemCount: 0,
        currentPage: 0,
        totalPages: 0,
      };
      // throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
    // throw error; // 일반적인 에러도 상위로 전달
    return {
      data: [],
      totalItemCount: 0,
      currentPage: 0,
      totalPages: 0,
    };
  }
};

// 마이페이지-나의 리뷰는 userId를 보내야함.
export const getMyReviews = async (props: GetMyReviewsProps): Promise<ReviewListType> => {
  const queryParams = new URLSearchParams();

  if (props.userId) queryParams.append('userId', props.userId.toString());
  if (props.sortOrder) queryParams.append('sortOrder', props.sortOrder);

  try {
    const response = await clientInstance.get<ReviewListType>({
      path: `/route/reviews?${queryParams.toString()}`,
    });
    return response;
  } catch (error) {
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);
      return {
        data: [],
        totalItemCount: 0,
        currentPage: 0,
        totalPages: 0,
      };
    }
    return {
      data: [],
      totalItemCount: 0,
      currentPage: 0,
      totalPages: 0,
    }; // 기본 값 반환
  }
};

// 모임 상세 페에지는 gatheringId를 보내야함.
export const getGatheringReviews = async (
  props: GetGatheringReviewsProps,
): Promise<ReviewListType> => {
  const queryParams = new URLSearchParams();

  if (props.gatheringId) queryParams.append('gatheringId', props.gatheringId.toString());
  if (props.sortOrder) queryParams.append('sortOrder', props.sortOrder);

  try {
    const response = await clientInstance.get<ReviewListType>({
      path: `/route/reviews?${queryParams.toString()}`,
    });
    return response;
  } catch (error) {
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);
      return {
        data: [],
        totalItemCount: 0,
        currentPage: 0,
        totalPages: 0,
      };
    }
    return {
      data: [],
      totalItemCount: 0,
      currentPage: 0,
      totalPages: 0,
    }; // 기본 값 반환
  }
};

export const getReviewsScore = async ({
  gatheringType,
}: {
  gatheringType: Gathering;
}): Promise<AverageScoreList> => {
  const queryParams = new URLSearchParams();
  if (gatheringType) queryParams.append('type', gatheringType);

  try {
    const response = await clientInstance.get<AverageScoreList>({
      path: `/route/reviews/scores?${queryParams.toString()}`,
    });
    return response;
  } catch (error) {
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);
      return [
        {
          teamId: String(process.env.NEXT_PUBLIC_TEAM_ID),
          type: 'DALLAEMFIT',
          oneStar: 0,
          twoStars: 0,
          threeStars: 0,
          fourStars: 0,
          fiveStars: 0,
          averageScore: 0,
        },
      ];
    }
    return [
      {
        teamId: String(process.env.NEXT_PUBLIC_TEAM_ID),
        type: 'DALLAEMFIT',
        oneStar: 0,
        twoStars: 0,
        threeStars: 0,
        fourStars: 0,
        fiveStars: 0,
        averageScore: 0,
      },
    ];
  }
};
