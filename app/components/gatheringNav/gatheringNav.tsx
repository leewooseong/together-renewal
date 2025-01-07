import { whatGatheringTypeAtom } from "@/app/store/atoms/gatheringNavAtoms";
import { TwhatGatheringTypeAtom } from "@/app/store/types/gatheringNav.types";
import { useAtom } from "jotai";
import DalaemfitSvg from "../svgComponent/dalaemfitSvg";
import WorkationSvg from "../svgComponent/workationSvg";



export default function GatheringNav() {
    const [gatheringType, setGatheringType] = useAtom(whatGatheringTypeAtom);

    const whatIsClicked = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        const getElementId = event.currentTarget.id as TwhatGatheringTypeAtom;
        if (getElementId === "ALL") {
            setGatheringType("DALLAEMFIT")
            return;
        }
        setGatheringType(getElementId)

    }

    const isDallaemfitActive = ["DALLAEMFIT", "ALL", "OFFICE_STRETCHING", "MINDFULNESS"].includes(gatheringType);
    const isAllActive = gatheringType === "ALL" || gatheringType === "DALLAEMFIT";

    return (
        <div>
            <h1>{gatheringType}</h1>
            <nav className="border-2 border-red-400 flex">
                <div onClick={whatIsClicked} id="DALLAEMFIT" className="flex items-center border-2 border-yellow-400 pb-[6px]">
                    <h3 className={`${isDallaemfitActive ? "text-gray-900" : "text-gray-400"
                        } text-lg font-semibold`}>달램핏</h3>
                    <DalaemfitSvg className={`${isDallaemfitActive ? "text-gray-900" : "text-gray-400"
                        }`} />
                </div>
                <div onClick={whatIsClicked} id="WORKATION" className="flex items-center border-2 border-green-400 pb-[6px]">
                    <h3 className={`${gatheringType === "WORKATION" ? "text-gray-900" : "text-gray-400"} text-lg font-semibold`}>워케이션</h3>
                    <WorkationSvg className={`${gatheringType === "WORKATION" ? "text-gray-900" : "text-gray-400"}`} />
                </div>
            </nav>
            {["DALLAEMFIT", "ALL", "OFFICE_STRETCHING", "MINDFULNESS"].includes(gatheringType)
                ? <nav className="border-2 border-blue-400 flex gap-2 mt-[10px] xs:mt-[14px]">
                    <button onClick={whatIsClicked} id="ALL" className={`${isAllActive ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                        } py-2 px-3 rounded-xl text-sm`}>전체</button>
                    <button onClick={whatIsClicked} id="OFFICE_STRETCHING" className={`${gatheringType === "OFFICE_STRETCHING" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                        } py-2 px-3 rounded-xl text-sm`}>오피스 스트레칭</button>
                    <button onClick={whatIsClicked} id="MINDFULNESS" className={`${gatheringType === "MINDFULNESS" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                        } py-2 px-3 rounded-xl text-sm`}>마인드풀니스</button>
                </nav> : ""}
        </div>
    );
}

