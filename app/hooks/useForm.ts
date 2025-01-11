import {useCallback} from 'react';
import {UseFormTrigger} from 'react-hook-form';

import _ from 'lodash';

import {TLoginInputs} from '../types/auth.types';

export const useDebounce = () => {
  const debounceEmailValidate = useCallback(
    _.debounce(async (field: keyof TLoginInputs, trigger: UseFormTrigger<TLoginInputs>) => {
      await trigger(field);
    }, 1000),
    [],
  );

  return {debounceEmailValidate};
};
