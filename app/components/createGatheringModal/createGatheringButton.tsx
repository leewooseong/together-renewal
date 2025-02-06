'use client';

import {useState} from 'react';

import {CreateGatheringModal} from './createGatheringModal';

export function CreateGatheringButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-orange-600 px-5 py-[10px] text-base font-semibold text-white transition-colors hover:bg-orange-600/90"
      >
        모임 만들기
      </button>
      {isOpen && <CreateGatheringModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
