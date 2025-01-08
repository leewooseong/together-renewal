import { whatGatheringTypeAtom } from "@/app/store/atoms/gatheringNavAtoms";
import { TwhatGatheringTypeAtom } from "@/app/store/types/gatheringNav.types";
import { useAtom } from "jotai";
import { motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import DalaemfitSvg from "../svgComponent/dalaemfitSvg";
import WorkationSvg from "../svgComponent/workationSvg";


export default function GatheringNav() {
    const [gatheringType, setGatheringType] = useAtom(whatGatheringTypeAtom);

    const firstDivRef = useRef<HTMLDivElement>(null);
    const secondDivRef = useRef<HTMLDivElement>(null);

    const [isSecondDivHovered, setIsSecondDivHovered] = useState(false);
    const [isFirstDivHovered, setIsFirstDivHovered] = useState(false);
    const [firstDivWidth, setFirstDivWidth] = useState(0);
    const [secondDivWidth, setSecondDivWidth] = useState(0);

    useEffect(() => {
        // 초기 상태 설정
        if (firstDivRef.current) {
            console.log(
                "Initial firstDivRef offsetWidth:",
                firstDivRef.current.offsetWidth
            );
            setFirstDivWidth(firstDivRef.current.offsetWidth);
        }
        if (secondDivRef.current) {
            console.log(
                "Initial secondDivRef offsetWidth:",
                secondDivRef.current.offsetWidth
            );
            setSecondDivWidth(secondDivRef.current.offsetWidth);
        }
    }, []);


    const whatIsClicked = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        const getElementId = event.currentTarget.id as TwhatGatheringTypeAtom;
        if (getElementId === "ALL") {
            setGatheringType("DALLAEMFIT")
            return;
        }
        setGatheringType(getElementId)

    }

    const x = useMotionValue(0)

    const isDallaemfitActive = ["DALLAEMFIT", "ALL", "OFFICE_STRETCHING", "MINDFULNESS"].includes(gatheringType);
    const isAllActive = gatheringType === "ALL" || gatheringType === "DALLAEMFIT";


    return (
        <div>
            <h1>{gatheringType}</h1>
            <nav className=" w-fit flex flex-col border-2 border-red-600">
                <div className="flex justify-between gap-3 w-fit">
                    <motion.div
                        animate={{
                            opacity: isDallaemfitActive
                                ? isSecondDivHovered
                                    ? 0.4
                                    : 1
                                : isFirstDivHovered
                                    ? 1
                                    : 0.4
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                        }}
                        onHoverStart={() => setIsFirstDivHovered(true)}
                        onHoverEnd={() => setIsFirstDivHovered(false)}
                        ref={firstDivRef}
                        onClick={whatIsClicked}
                        id="DALLAEMFIT"
                        className="flex items-center pb-[6px]  ">
                        {/* <h3
                            className={`${isDallaemfitActive ? "text-gray-900" : "text-gray-400"
                                } text-lg font-semibold pr-1`}>달램핏
                        </h3> */}
                        <h3
                            className={`text-lg font-semibold pr-1 text-gray-900 `}>달램핏
                        </h3>
                        <DalaemfitSvg className={`text-gray-900`} />
                    </motion.div>
                    {/* 
                    <motion.div
                        animate={{
                            opacity: isDallaemfitActive
                                ? isSecondDivHovered
                                    ? 0.5
                                    : 1
                                : isFirstDivHovered
                                    ? 1
                                    : 0.5
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                        onHoverStart={() => setIsFirstDivHovered(true)}
                        onHoverEnd={() => setIsFirstDivHovered(false)}
                        ref={firstDivRef}
                        onClick={whatIsClicked}
                        id="DALLAEMFIT"
                        className="flex items-center pb-[6px]  ">
            
                        <h3
                            className={`text-lg font-semibold pr-1
                                ${isDallaemfitActive
                                    ? isSecondDivHovered
                                        ? "text-gray-400"
                                        : "text-gray-900"
                                    : isFirstDivHovered
                                        ? "text-gray-900"
                                        : "text-gray-400"} `}>달램핏
                        </h3>
                        <DalaemfitSvg className={`${isDallaemfitActive ? isSecondDivHovered
                            ? "text-gray-400"
                            : "text-gray-900"
                            : isFirstDivHovered
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`} />
                    </motion.div> */}
                    <motion.div
                        animate={{
                            // opacity: isFirstDivHovered ? 0.8 : 1,
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                        }}
                        onHoverStart={() => setIsSecondDivHovered(true)}
                        onHoverEnd={() => setIsSecondDivHovered(false)}
                        ref={secondDivRef}
                        onClick={whatIsClicked}
                        id="WORKATION"
                        className="flex items-center pb-[6px]">

                        <h3 className={`text-lg font-semibold pr-1 
                        ${!isDallaemfitActive
                                ? isFirstDivHovered
                                    ? "text-gray-400"
                                    : "text-gray-900"
                                : isSecondDivHovered
                                    ? "text-gray-900"
                                    : "text-gray-400"}  `}>워케이션</h3>
                        <WorkationSvg className={`${!isDallaemfitActive ? isFirstDivHovered
                            ? "text-gray-400"
                            : "text-gray-900"
                            : isSecondDivHovered
                                ? "text-gray-900"
                                : "text-gray-400"} `} />
                        {/* <WorkationSvg className={`${gatheringType === "WORKATION" ? "text-gray-900" : "text-gray-400"} `} /> */}
                    </motion.div>

                </div>

                <div className="">
                    <motion.div
                        animate={{
                            x:
                                gatheringType === "WORKATION"
                                    ? isFirstDivHovered
                                        ? 0
                                        : firstDivWidth + 12
                                    : isSecondDivHovered
                                        ? firstDivWidth + 12
                                        : 0,
                            // x: isHovered ? firstDivWidth + 12 : 0, // 상태에 따라 x값 변경
                            width:
                                gatheringType === "WORKATION"
                                    ? isFirstDivHovered
                                        ? firstDivWidth
                                        : secondDivWidth
                                    : isSecondDivHovered
                                        ? secondDivWidth
                                        : firstDivWidth,
                            // width: isHovered ? secondDivWidth : firstDivWidth, // 상태에 따라 width 변경
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                        }}
                        className={`w-[90px] h-[2px] bg-gray-900 `}
                    />
                </div>

            </nav>
            {
                ["DALLAEMFIT", "ALL", "OFFICE_STRETCHING", "MINDFULNESS"].includes(gatheringType)
                    ? <nav className="flex gap-2 mt-[10px] xs:mt-[14px]">
                        <button onClick={whatIsClicked} id="ALL" className={`${isAllActive ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                            } py-2 px-3 rounded-xl text-sm`}>전체</button>
                        <button onClick={whatIsClicked} id="OFFICE_STRETCHING" className={`${gatheringType === "OFFICE_STRETCHING" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                            } py-2 px-3 rounded-xl text-sm`}>오피스 스트레칭</button>
                        <button onClick={whatIsClicked} id="MINDFULNESS" className={`${gatheringType === "MINDFULNESS" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                            } py-2 px-3 rounded-xl text-sm`}>마인드풀니스</button>
                    </nav> : ""
            }
        </div >
    );
}
