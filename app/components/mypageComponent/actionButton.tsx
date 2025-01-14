import leaveGatheringsApi from '../../apis/leaveGatheringsApi';

export default function ActionButton({
  isCompleted,
  isReviewed,
  id,
  onOpenModal,
}: {
  isCompleted: boolean;
  isReviewed: boolean;
  id: number;
  onOpenModal: () => void;
}) {
  const baseStyle = 'w-[120px] h-[40px] rounded-xl font-semibold text-sm';

  if (isCompleted && isReviewed) {
    return null;
  }

  const label = isCompleted ? '리뷰 작성하기' : '예약 취소하기';
  const handleButton = async () => {
    try {
      if (isCompleted) {
        onOpenModal();
      } else {
        await leaveGatheringsApi(id);
        window.location.href = '/mypage';
      }
    } catch {
      throw new Error('API 요청 오류');
    }
  };
  const style = isCompleted
    ? 'bg-orange-600 text-white'
    : 'bg-white text-orange-600 border-2 border-orange-500';

  return (
    <button type="button" className={`${baseStyle} ${style}`} onClick={handleButton}>
      {label}
    </button>
  );
}
