import {CodeitError} from '../../types/error.types';
import {clientInstance} from '../client';

export const writeReview = async (gatheringId: number, score: number, comment: string) => {
  try {
    await clientInstance.post({path: '/route/token/reviews/', body: {gatheringId, score, comment}});
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
  }
};
