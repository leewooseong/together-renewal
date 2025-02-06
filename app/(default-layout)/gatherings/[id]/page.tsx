'use client';

import BottomBar from '../../../components/gatherings/bottomBar';

export default function Gathering() {
  // const {data: joinGatheringResponse} = useQuery<JoinGatheringResponse>({
  //   queryKey: ['postJoinGathering', gatheringId],
  //   queryFn: () => postJoinGathering({id: gatheringId}),
  // });

  return (
    <>
      <div>
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
        <div className="size-44 bg-pink-400" />
      </div>
      <BottomBar isOwner={false} gatheringId={1} />
    </>
  );
}
