import Image from "next/image";


interface IReviewComponentType {
    gatheringImg: string;
    score: number;
    comment: string,
    gatheringType: string;
    gatheringLocation: string;
    userName: string;
    userImg: string;
    createdAt: string;
}


export default function Review({ gatheringImg, score, comment, gatheringType, gatheringlocation, userName, userImg, createdAt }: IReviewComponentType) {
    return (
        <div className="grid grid-rows-1 w-[311px] md:w-full md:grid-cols-[280px_minmax(0px,_1fr)] gap-6 border-2 border-orange-600">
            {!GatheringImg ? <div className="bg-neutral-500 w-[311px] md:w-[280px] h-[156px] rounded-3xl"></div> : <div className="bg-neutral-800 w-[311px] md:w-[280px] h-[156px] rounded-3xl"></div>}
            <div className=" flex flex-col h-[168px] md:h-[156px] border-2 md: border-red-500">
                <Image src="/heart-default.svg"
                    alt="empty heart"
                    width={24}
                    height={24}
                />
                <p className="text-sm pt-2.5">내용ㅇ나러미너힘나어히;ㅁㅇ러ㅗ훔ㅇ;ㅏㅓ험나ㅣㅓ히;ㅏㅁㅎ</p>
                <div className="pt-2.5 text-xs">타입 받아서 넣으면됨됨 · location받아서 넣기</div>
                <div className="pt-2 flex  items-center text-xs">
                    <div className="flex items-center">
                        {!userImg ? <Image src="/profile-default.svg" alt="기본 프로필 이미지" width={24}
                            height={24}></Image> : <div className="bg-yellow-400 w-6 h-6 rounded-full"></div>}
                        <span className="pl-2">유저이름</span>
                    </div>
                    <div className="pl-2 pr-3">|</div>
                    <div className="text-gray-500">2024.11.11</div>
                </div>

            </div>
        </div>
    );
}
