"use client"


import Image from "next/image";


interface IReviewComponentType {
    gatheringImg: string;
    score: number;
    comment: string;
    gatheringType: string;
    gatheringLocation: string;
    userImg: string;
    userName: string;
    createdAt: string;
}


export default function Review({ gatheringImg, score, comment, gatheringType, gatheringLocation, userImg, userName, createdAt }: IReviewComponentType) {

    return (
        <div className="grid grid-rows-1 w-[311px] md:w-full md:grid-cols-[280px_minmax(0px,_1fr)] gap-6 border-2 border-orange-600">

            {!gatheringImg ? <div className="bg-neutral-800 w-[311px] md:w-[280px] h-[156px] rounded-3xl"></div> : <img src={gatheringImg} alt="모임 이미지" width={311} height={156} className="w-[311px] md:w-[280px] h-[156px] rounded-3xl" />}
            <div className=" flex flex-col h-[168px] md:h-[156px] border-2 md: border-red-500">
                <Image src="/heart-default.svg"
                    alt="empty heart"
                    width={24}
                    height={24}
                />
                <p className="text-sm pt-2.5">{comment}</p>
                <div className="pt-2.5 text-xs">{`${gatheringType} · ${gatheringLocation}`}</div>
                <div className="pt-2 flex  items-center text-xs">
                    <div className="flex items-center">
                        {!userImg ? <Image src="/profile-default.svg" alt="기본 프로필 이미지" width={24}
                            height={24}></Image> : <img src={userImg} className="bg-yellow-400 w-6 h-6 rounded-full" />}
                        <span className="pl-2">{userName}</span>
                    </div>
                    <div className="pl-2 pr-3">|</div>
                    <div className="text-gray-500">{createdAt}</div>
                </div>

            </div>
        </div>
    );
}
