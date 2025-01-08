import {ApproveCheck} from '../common/approveCheck';
import {DateTimeInfoChip} from '../common/chips/chip-info';
import {ProgressBar} from '../common/progressBar';

export default function ContainerInfo(param: IGetGatherings) {
  return (
    <div className="w-[486px] h-[270px] bg-white rounded-2xl flex items-center justify-center">
      <div className="w-full h-[222px] flex flex-col justify-center items-center">
        <div className="w-full h-[129px] flex justify-center border-b-2 border-gray-200 border-dashed">
          <div className="w-[438px] h-[86px] flex flex-col relative">
            <button className="absolute top-0 right-0">
              <img src="/emptyHeart.svg" className="w-[48px] h-[48px]" />
            </button>
            <div className="w-[390px] h-[28px] font-semibold text-lg">
              <p>{param.name}</p>
            </div>
            <div className="w-[390px] h-[20px] font-medium text-sm">{param.location}</div>
            <div className="w-[390px] h-[24px] mt-[14px]">
              <DateTimeInfoChip dateTime={param.dateTime} />
            </div>
          </div>
        </div>
        <div className="w-[438px] h-[69px] mt-[24px] flex flex-col">
          <div className="w-full h-[29px] text-sm font-semibold flex items-center relative">
            <p>{`모집 정원 ${param.capacity}명`}</p>
            <div className="ml-[12px]">//아이콘//</div>
            <div className="h-[24px] text-sm font-medium absolute right-0 bottom-0">
              {ApproveCheck(param.participantCount)}
            </div>
          </div>
          <div className="w-full h-[4px] mt-[12px]">
            {ProgressBar(param.participantCount, param.capacity)}
          </div>
          <div className="w-full h-[16px] mt-[8px] text-xs font-medium flex items-center relative">
            <p>{`최소인원 5명`}</p>
            <p className="absolute right-0">{`최대인원 ${param.capacity}명`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
