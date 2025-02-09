import clsx from 'clsx';

import {UnControlledInputProps} from '../../../types/gatherings/createGathering.types';
import {GatheringFormSchema} from '../../../utils/validation';

// React.forwardRef<HTMLInputElement, InputProps>
export function GatheringNameInput({
  register,
  registerKey,
  label,
  error,
}: UnControlledInputProps<GatheringFormSchema>) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        {...register(registerKey)}
        type="text"
        placeholder="모임 이름을 작성해주세요"
        // value={value || ''}
        className={clsx(
          'w-full rounded-lg bg-gray-50 px-4 py-[10px] placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-orange-600',
        )}
      />
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
}
