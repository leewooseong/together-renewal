import leaveGatheringsApi from '../../apis/leaveGatheringsApi';
import BadReqErr from '../controller/error/BadRequestErr';

export default function RenderButton({
  state,
  review,
  id,
  onOpenModal,
}: {
  state: boolean;
  review: boolean;
  id: number;
  onOpenModal: () => void;
}) {
  const baseStyle = 'w-[120px] h-[40px] rounded-xl font-semibold text-sm';

  if (state && review) {
    return null;
  }

  const label = state ? '리뷰 작성하기' : '예약 취소하기';
  const handleButton = async () => {
    try {
      if (state) {
        onOpenModal();
      } else {
        await leaveGatheringsApi(id);
        window.location.href = '/mypage';
      }
    } catch {
      throw new BadReqErr('API 요청 오류');
    }
  };
  const style = state
    ? 'bg-orange-600 text-white'
    : 'bg-white text-orange-600 border-2 border-orange-500';

  return (
    <button type="button" className={`${baseStyle} ${style}`} onClick={handleButton}>
      {label}
    </button>
  );
}
