import {ChangeEvent} from 'react';

import clsx from 'clsx';

import {InputProps} from '../../../types/gatherings/createGathering.types';

export function Capacity({value, onChange, error}: InputProps<number | null>) {
  const handleChangeCapacity = (event: ChangeEvent<HTMLInputElement>) => {
    const newCapacity = parseInt(event.target.value, 10);
    onChange(newCapacity);
  };
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">모집 정원</label>
      <input
        type="number"
        min="5"
        placeholder="최소 5인 이상 입력해주세요."
        value={value || ''}
        onChange={handleChangeCapacity}
        className={clsx(
          'no-spinner w-full rounded-lg bg-gray-50 px-4 py-[10px] placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-orange-600',
        )}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
