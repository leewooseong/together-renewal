import {CodeitError} from '../../types/error.types';
import {clientInstance} from '../client';

export const createGathering = async (createGatheringFormData: FormData) => {
  try {
    await clientInstance.post({
      path: '/route/token/gatherings',
      body: createGatheringFormData,
      contentType: 'formData',
    });
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
  }
};
