"use client"


import { ReviewScore } from "@/app/components/reviewComponent/reviewScore";
import { IReviewComponentType } from "@/app/types/reviews";
import Image from "next/image";

// 마이페이지-나의 리뷰는 pageName = ""MY_PAGE"를 보내야함.
//모임 상세 페에지는 pageName = "GATHERING"을 보내야함.

export default function Review({ gatheringImg, score, comment, gatheringType, gatheringLocation, userImg, userName, createdAt, pageName = "MY_PAGE" }: IReviewComponentType) {

    let createDate: string = createdAt.slice(0, 10).replaceAll("-", ".")

    return (
        <div className={`grid grid-rows-1 w-[311px] md:w-full  ${pageName === "GATHERING" ? "md:grid-cols-1" : "md:grid-cols-[280px_minmax(0,_1fr)]"} gap-6 box-border`}>
            {pageName !== "GATHERING" && (
                !gatheringImg ? (
                    <div className="bg-neutral-800 w-[311px] md:w-[280px] h-[156px] rounded-3xl"></div>
                ) : (
                    <div className="relative w-[311px] md:w-[280px] h-[156px] rounded-3xl overflow-hidden">
                        <Image
                            src={gatheringImg}
                            alt="모임 이미지"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                )
            )}
            {/* {!gatheringImg ? <div className="bg-neutral-800 w-[311px] md:w-[280px] h-[156px] rounded-3xl"></div> : <img src={gatheringImg} alt="모임 이미지" className="w-[311px] md:w-[280px] h-[156px] rounded-3xl" />} */}
            <div className=" flex flex-col pb-5 border-b-2 border-gray-200 border-dashed md:px-0">
                <ReviewScore score={score} />
                <p className="text-sm pt-2.5">{comment}</p>
                {pageName === "GATHERING" ? "" : <div className="pt-2.5 text-xs">{`${gatheringType} · ${gatheringLocation}`}</div>}
                <div className="pt-2 flex  items-center text-xs">
                    {pageName === "MY_PAGE" ? "" : <div className="flex items-center">
                        {!userImg ? <Image src="/profile-default.svg" alt="기본 프로필 이미지" width={24}
                            height={24}></Image> : <img src={userImg} className="bg-yellow-400 w-6 h-6 rounded-full" />}
                        <span className="pl-2">{userName}</span>
                    </div>}
                    {pageName === "MY_PAGE" ? "" : <div className="pl-2 pr-3">|</div>}
                    <div className="text-gray-500">{createDate}</div>
                </div>

            </div>
        </div>
    );
}


{/* <Image
src={gatheringImg}
alt="모임 이미지"
width={311}
height={156}
className="w-[311px] md:w-[280px] h-[156px] rounded-3xl"
/> */}