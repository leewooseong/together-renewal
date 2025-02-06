'use client';

import {useState} from 'react';

import Modal, {ModalType} from './modal';

type BottomBarType = {
  isLogin: boolean;
  isOwner: boolean;
  gatheringId: number | undefined;
};

export default function BottomBar({isLogin, isOwner, gatheringId}: BottomBarType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>({
    type: 'redirect',
    message: '',
  });

  const handleJoinButton = () => {
    if (isLogin) {
      // gatherings/id/join으로 요청 보내고 참여성공했다고 모달 띄우기

      setIsModalOpen(true);
      setModalType({
        type: 'confirm',
        message: '참여하시겠어요?',
      });
    } else {
      // 로그인 페이지로 넘기기
      setIsModalOpen(true);
      setModalType({
        type: 'redirect',
        message: '로그인이 필요해요',
      });
    }
  };

  const handleCancelButton = () => {
    if (isOwner) {
      // 취소하기 api 요청 보내고 취소하시겠습니까? 모달 띄우고 ok하면 메인 페이지로 보내버리기
      setIsModalOpen(true);
      setModalType({
        type: 'confirm',
        message: '정말 취소하시겠어요?',
      });
    } else {
      setModalType({
        type: 'alert',
        message: '모임 주최자가 아니에요😞',
      });
    }
  };

  const handleShareButton = () => {
    if (isOwner) {
      // 복사 됐다고 모달 띄우기

      setIsModalOpen(true);
      setModalType({
        type: 'alert',
        message: '링크가 복사됐어요!',
      });
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 z-10 w-full border-t-2 border-t-gray-900 bg-white px-4 py-5 sm:h-[84px] sm:justify-center sm:px-6 ${isOwner ? 'h-auto sm:flex' : 'flex h-auto justify-between'}`}
      >
        <div
          className={`md:w-[996px] ${isOwner ? 'grid grid-rows-2 gap-[10px] sm:flex sm:justify-between' : 'flex items-center justify-between gap-6'}`}
        >
          <div className="flex flex-col justify-between gap-1">
            <div className="text-sm font-semibold text-gray-900 sm:text-base">
              더 건강한 나와 팀을 위한 프로그램🏃
            </div>
            <div className="text-xs text-gray-700">
              {isOwner
                ? '모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요'
                : '국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요'}
            </div>
          </div>
          <div className={`${isOwner ? 'flex gap-2 sm:w-[238px]' : 'flex justify-end'} `}>
            {isOwner ? (
              <>
                <button
                  onClick={handleCancelButton}
                  type="button"
                  className="h-11 flex-1 rounded-xl border border-orange-600 font-semibold text-orange-600"
                >
                  취소하기
                </button>
                <button
                  onClick={handleShareButton}
                  type="button"
                  className="h-11 flex-1 rounded-xl bg-orange-600 font-semibold text-white"
                >
                  공유하기
                </button>
              </>
            ) : (
              <button
                onClick={handleJoinButton}
                type="button"
                className="h-11 w-[115px] rounded-xl bg-orange-600 font-semibold text-white"
              >
                참여하기
              </button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <Modal gatheringId={gatheringId} modalType={modalType} setIsModalOpen={setIsModalOpen} />
      ) : (
        ''
      )}
    </>
  );
}
