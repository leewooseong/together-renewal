import {useCallback} from 'react';

import _ from 'lodash';
import {UseFormTrigger} from 'react-hook-form';

import {LoginInputsType} from '../types/auth.types';

export const useDebounce = () => {
  const debounceValidate = useCallback(
    _.debounce(async (field: keyof LoginInputsType, trigger: UseFormTrigger<LoginInputsType>) => {
      await trigger(field);
    }, 1000),
    [],
  );

  return {debounceValidate};
};
