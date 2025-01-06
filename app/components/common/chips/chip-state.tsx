/** 이용 예정 chip */
export function UpcomingReservationChip() {
  return (
    <div className="flex items-center justify-center w-[76px] h-[32px] bg-orange-100 text-orange-600 text-[14px] font-medium leading-none rounded-[24px]">
      <p>이용 예정</p>
    </div>
  );
}

/** 이용 완료 chip */
export function ReservationFinishedChip() {
  return (
    <div className="flex items-center justify-center w-[76px] h-[32px] bg-gray-200 text-gray-500 text-[14px] font-medium leading-none rounded-[24px]">
      <p>이용 완료</p>
    </div>
  );
}

/** 개설 대기 chip */
export function WaitingForApproval() {
  return (
    <div className="flex items-center justify-center w-[76px] h-[32px] bg-white border border-gray-200 text-gray-500 text-[14px] font-medium leading-none rounded-[24px]">
      <p>개설대기</p>
    </div>
  );
}

/** 개설 확정 chip */
export function EventApproved() {
  return (
    <div className="flex items-center justify-center w-[93px] h-[32px] bg-white border border-orange-100 text-orange-500 text-[14px] font-medium leading-none rounded-[24px]">
      <img src="/orangeCheckIcon.svg " />
      <p className="ml-1">개설확정</p>
    </div>
  );
}
