import Image from 'next/image';

/** 5인 이상 개설 확정 */
export default function ApproveCheck(participantCount: number): React.ReactNode {
  if (participantCount >= 5) {
    return (
      <div className="ml-3 flex items-center font-medium text-orange-500">
        <Image className="h-[24px] w-[24px]" src="/orangeCheckIcon.svg" alt="확정 아이콘" />
        <p className="mt-1">개설확정</p>
      </div>
    );
  }
  return null;
}
