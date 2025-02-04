'use client';

import {Dispatch, SetStateAction, useState} from 'react';

import Image from 'next/image';
import Link from 'next/link';

export type ModalType = {
  type: 'confirm' | 'alert' | 'redirect';
  message: string;
};
export type ModalPropsType = {
  modalType: ModalType;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Modal({modalType, setIsModalOpen}: ModalPropsType) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseButton = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleRedirectButton = () => {
    setIsLoading(true);
  };

  const handleConfirmButton = () => {
    setIsModalOpen(prev => !prev);
    // api요청 보내면 된다.
  };

  return (
    <div className="fixed left-0 top-0 z-30 flex size-full items-center justify-center bg-gray-500/50 p-0">
      <div className="z-50 flex h-[199px] w-[300px] flex-col items-center justify-between rounded-lg bg-white p-6 sm:h-[188px] sm:w-[450px]">
        {isLoading ? (
          <div className="flex size-full items-center justify-center">
            <span className="text-2xl font-semibold text-orange-600">로딩 중...</span>
          </div>
        ) : (
          <>
            <div
              className={`flex w-full justify-end ${modalType.type !== 'redirect' ? 'invisible' : 'block'}`}
            >
              <Image
                src="/icons/close-button.svg"
                alt="닫기 버튼"
                width={24}
                height={24}
                onClick={handleCloseButton}
                className="cursor-pointer"
              />
            </div>
            <div>
              <span className="text-gray-900">{modalType.message}</span>
            </div>
            {modalType.type === 'redirect' ? (
              <Link
                href="/login"
                className="flex w-full justify-center sm:justify-end"
                onClick={handleRedirectButton}
              >
                <button
                  type="button"
                  className="h-11 w-[120px] rounded-xl bg-orange-600 font-semibold text-white"
                >
                  확인
                </button>
              </Link>
            ) : (
              ''
            )}
            {modalType.type === 'alert' ? (
              <div className="flex w-full justify-center sm:justify-end">
                <button
                  type="button"
                  className="h-11 w-[120px] rounded-xl bg-orange-600 font-semibold text-white"
                  onClick={handleCloseButton}
                >
                  확인
                </button>
              </div>
            ) : (
              ''
            )}

            {modalType.type === 'confirm' ? (
              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  className="h-11 w-[120px] rounded-xl border border-orange-600 font-semibold text-orange-600"
                  onClick={handleCloseButton}
                >
                  아니요
                </button>
                <button
                  type="button"
                  className="h-11 w-[120px] rounded-xl bg-orange-600 font-semibold text-white"
                  onClick={handleConfirmButton}
                >
                  네
                </button>
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </div>
    </div>
  );
}
