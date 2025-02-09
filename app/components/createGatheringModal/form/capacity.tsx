import clsx from 'clsx';

import {
  CreateGatheringState,
  UnControlledInputProps,
} from '../../../types/gatherings/createGathering.types';

export function Capacity({
  register,
  registerKey,
  label,
}: UnControlledInputProps<CreateGatheringState>) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        {...register(registerKey)}
        type="number"
        min="5"
        placeholder="최소 5인 이상 입력해주세요."
        className={clsx(
          'no-spinner w-full rounded-lg bg-gray-50 px-4 py-[10px] placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-orange-600',
        )}
      />
      {/* {error && <span className="text-sm text-red-500">{error}</span>} */}
    </div>
  );
}
