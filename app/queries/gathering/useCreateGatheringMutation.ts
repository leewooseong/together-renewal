import {useMutation} from '@tanstack/react-query';
import {SetStateAction} from 'react';
import {toast} from 'react-toastify';
import {createGathering} from '../../apis/gatherings/createGathering';
import {CodeitError} from '../../types/error.types';

export const useCreateGatheringMutation = <T,>(
  setErrorMessage: React.Dispatch<SetStateAction<T>>,
) => {
  const createGatheringMutation = useMutation({
    mutationFn: createGathering,
    onSuccess: () => {
      toast.success('모임 생성 성공');
    },
    onError: error => {
      if (error instanceof CodeitError) {
        const {parameter, message} = error;
        parameter && setErrorMessage(prev => ({...prev, [parameter]: message}));
      }
    },
  });

  return {createGatheringMutation};
};
