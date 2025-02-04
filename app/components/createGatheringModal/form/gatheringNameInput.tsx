import clsx from 'clsx';

import {InputProps} from '../../../types/gatherings/createGathering.types';

export function GatheringNameInput({value, onChange, error}: InputProps<string | ''>) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">모임 이름</label>
      <input
        type="text"
        className={clsx(
          'w-full rounded-lg bg-gray-50 px-4 py-[10px] placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-orange-600',
        )}
        placeholder="모임 이름을 작성해주세요"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
