/* eslint-disable no-nested-ternary */
import {useEffect, useRef, useState} from 'react';

import {useAtom} from 'jotai';
import {motion} from 'motion/react';

import {whatGatheringTypeAtom} from '@/app/store/atoms/gatheringNavAtoms';
import {TwhatGatheringTypeAtom} from '@/app/store/types/gatheringNav.types';

import DalaemfitSvg from '../svgComponent/dalaemfitSvg';
import WorkationSvg from '../svgComponent/workationSvg';

export default function GatheringNav() {
  const [gatheringType, setGatheringType] = useAtom(whatGatheringTypeAtom);

  const firstDivRef = useRef<HTMLDivElement>(null);
  const secondDivRef = useRef<HTMLDivElement>(null);

  const [isSecondDivHovered, setIsSecondDivHovered] = useState(false);
  const [isFirstDivHovered, setIsFirstDivHovered] = useState(false);
  const [firstDivWidth, setFirstDivWidth] = useState(0);
  const [secondDivWidth, setSecondDivWidth] = useState(0);

  const [, setIsVisible] = useState(true);

  useEffect(() => {
    if (firstDivRef.current) {
      setFirstDivWidth(firstDivRef.current.offsetWidth);
    }
    if (secondDivRef.current) {
      setSecondDivWidth(secondDivRef.current.offsetWidth);
    }
  }, []);

  const whatIsClicked = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    const getElementId = event.currentTarget.id as TwhatGatheringTypeAtom;
    if (getElementId === 'ALL') {
      setGatheringType('DALLAEMFIT');
      return;
    }
    if (getElementId !== 'WORKATION') {
      setIsVisible(true);
    }

    setGatheringType(getElementId);
  };

  const isDallaemfitActive = ['DALLAEMFIT', 'ALL', 'OFFICE_STRETCHING', 'MINDFULNESS'].includes(
    gatheringType,
  );
  const isAllActive = gatheringType === 'ALL' || gatheringType === 'DALLAEMFIT';

  return (
    <div>
      <nav className="flex w-fit flex-col">
        <div className="flex w-fit justify-between gap-3">
          <motion.div
            ref={firstDivRef}
            animate={{
              opacity: isDallaemfitActive
                ? isSecondDivHovered
                  ? 0.4
                  : 1
                : isFirstDivHovered
                  ? 1
                  : 0.4,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            onHoverStart={() => setIsFirstDivHovered(true)}
            onHoverEnd={() => setIsFirstDivHovered(false)}
            onClick={whatIsClicked}
            id="DALLAEMFIT"
            className="flex items-center pb-[6px]"
          >
            <h3 className="pr-1 text-lg font-semibold text-gray-900">달램핏</h3>
            <DalaemfitSvg className="text-gray-900" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: !isDallaemfitActive
                ? isFirstDivHovered
                  ? 0.4
                  : 1
                : isSecondDivHovered
                  ? 1
                  : 0.4,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            onHoverStart={() => setIsSecondDivHovered(true)}
            onHoverEnd={() => setIsSecondDivHovered(false)}
            ref={secondDivRef}
            onClick={whatIsClicked}
            id="WORKATION"
            className="flex items-center pb-[6px]"
          >
            <h3 className="pr-1 text-lg font-semibold text-gray-900">워케이션</h3>
            <WorkationSvg className="text-gray-900" />
          </motion.div>
        </div>

        <motion.div
          animate={{
            x:
              gatheringType === 'WORKATION'
                ? isFirstDivHovered
                  ? 0
                  : firstDivWidth + 12
                : isSecondDivHovered
                  ? firstDivWidth + 12
                  : 0,
            width:
              gatheringType === 'WORKATION'
                ? isFirstDivHovered
                  ? firstDivWidth
                  : secondDivWidth
                : isSecondDivHovered
                  ? secondDivWidth
                  : firstDivWidth,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          className="h-[2px] w-[90px] bg-gray-900"
        />
      </nav>
      <motion.nav
        animate={{
          opacity: gatheringType === 'WORKATION' ? 0 : 1,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
        onAnimationComplete={() => {
          if (gatheringType === 'WORKATION') {
            setIsVisible(false);
          }
        }}
        className="xs:mt-[14px] mt-[10px] flex gap-2"
      >
        <button
          type="button"
          onClick={whatIsClicked}
          id="ALL"
          className={`${
            isAllActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
          } rounded-xl px-3 py-2 text-sm`}
        >
          전체
        </button>
        <button
          type="button"
          onClick={whatIsClicked}
          id="OFFICE_STRETCHING"
          className={`${
            gatheringType === 'OFFICE_STRETCHING'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-200 text-gray-900'
          } rounded-xl px-3 py-2 text-sm`}
        >
          오피스 스트레칭
        </button>
        <button
          type="button"
          onClick={whatIsClicked}
          id="MINDFULNESS"
          className={`${
            gatheringType === 'MINDFULNESS' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
          } rounded-xl px-3 py-2 text-sm`}
        >
          마인드풀니스
        </button>
      </motion.nav>
    </div>
  );
}
