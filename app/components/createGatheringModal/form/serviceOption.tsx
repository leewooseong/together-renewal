import Image from 'next/image';

import {ServiceType} from '../../../types/gatherings/createGathering.types';

export function ServiceOption({
  type,
  label,
  subLabel,
  isSelected,
  onClick,
}: {
  type: ServiceType;
  label: string;
  subLabel: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <label
      className={`flex grow cursor-pointer items-start gap-2 rounded-lg border p-4 transition-colors ${
        isSelected ? 'bg-gray-900 text-white' : 'bg-white'
      }`}
    >
      <input
        type="radio"
        name="serviceType"
        value={type}
        checked={isSelected}
        onChange={onClick}
        className="hidden"
      />
      {/* 커스텀 라디오 체크박스 UI */}
      {isSelected ? (
        <Image src="icons/checkbox-checked.svg" alt="선택됨 아이콘" width={24} height={24} />
      ) : (
        <Image src="icons/checkbox-unchecked.svg" alt="선택 안됨 아이콘" width={24} height={24} />
      )}
      {/* 커스텀 라디오 컨텐트 UI */}
      <div className="flex flex-col">
        <span className="text-base font-semibold">{label}</span>
        <span className="text-xs font-medium">{subLabel}</span>
      </div>
    </label>
  );
}
