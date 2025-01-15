import {Gathering} from '../common/gatheringFilter.types';

export type AverageScoreListProps = {
  data:
    | Record<string, never>
    | {
        teamId: string;
        type: Gathering;
        oneStar: number;
        twoStars: number;
        threeStars: number;
        fourStars: number;
        fiveStars: number;
        averageScore: number;
      };
};
