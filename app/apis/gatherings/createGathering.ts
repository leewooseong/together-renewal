import {CodeitError} from '../../types/error.types';
import {CreateGatheringResponseData} from '../../types/gatherings/createGathering.types';
import {clientInstance} from '../client';

export const createGathering = async (
  createGatheringFormData: FormData,
): Promise<CreateGatheringResponseData | undefined> => {
  try {
    const response = await clientInstance.post<CreateGatheringResponseData>({
      path: '/route/token/gatherings',
      body: createGatheringFormData,
      contentType: 'formData',
    });

    return response;
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
    return undefined;
  }
};
