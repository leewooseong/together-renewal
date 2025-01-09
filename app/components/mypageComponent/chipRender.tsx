import {
  EventApproved,
  ReservationFinishedChip,
  UpcomingReservationChip,
  WaitingForApproval,
} from '../common/chips/chip-state';

export default function RenderChips({
  isCompleted,
  participantCount,
  isMyGathering,
}: {
  isCompleted: boolean;
  participantCount: number;
  isMyGathering: boolean | undefined;
}) {
  if (!isMyGathering) {
    return null;
  }

  return (
    <div className="flex w-full h-[50px] pt-[8px] gap-[8px] justify-start">
      {isCompleted ? (
        <ReservationFinishedChip />
      ) : (
        <>
          <UpcomingReservationChip />
          {participantCount >= 5 ? <EventApproved /> : <WaitingForApproval />}
        </>
      )}
    </div>
  );
}
