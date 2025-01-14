/* eslint-disable no-nested-ternary */
import {useEffect, useRef, useState} from 'react';

import {motion} from 'motion/react';

import {Gathering, GatheringFilterProps} from '@/app/types/gatheringFilter.types';

import {DallaemfitSvg} from './svgComponent/dallaemfitSvg';
import {WorkationSvg} from './svgComponent/workationSvg';

export function GatheringFilter({gatheringType, setGatheringType}: GatheringFilterProps) {
  const dallaemfitRef = useRef<HTMLDivElement>(null);
  const workationRef = useRef<HTMLDivElement>(null);

  const [isDallaemfitHovered, setIsDallaemfitHovered] = useState(false);
  const [isWorkationHovered, setIsWorkationHovered] = useState(false);
  const [dallaemfitWidth, setDallaemfitWidth] = useState(0);
  const [workationWidth, setWorkationWidth] = useState(0);

  const [, setIsVisible] = useState(true);

  useEffect(() => {
    if (dallaemfitRef.current) {
      setDallaemfitWidth(dallaemfitRef.current.offsetWidth);
    }
    if (workationRef.current) {
      setWorkationWidth(workationRef.current.offsetWidth);
    }
  }, []);

  const handleElementClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    const getElementId = event.currentTarget.id as Gathering;
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
            ref={dallaemfitRef}
            animate={{
              opacity: isDallaemfitActive
                ? isWorkationHovered
                  ? 0.4
                  : 1
                : isDallaemfitHovered
                  ? 1
                  : 0.4,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            onHoverStart={() => setIsDallaemfitHovered(true)}
            onHoverEnd={() => setIsDallaemfitHovered(false)}
            onClick={handleElementClick}
            id="DALLAEMFIT"
            className="flex items-center pb-[6px]"
          >
            <h3 className="pr-1 text-lg font-semibold text-gray-900">달램핏</h3>
            <DallaemfitSvg className="text-gray-900" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: !isDallaemfitActive
                ? isDallaemfitHovered
                  ? 0.4
                  : 1
                : isWorkationHovered
                  ? 1
                  : 0.4,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            onHoverStart={() => setIsWorkationHovered(true)}
            onHoverEnd={() => setIsWorkationHovered(false)}
            ref={workationRef}
            onClick={handleElementClick}
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
                ? isDallaemfitHovered
                  ? 0
                  : dallaemfitWidth + 12
                : isWorkationHovered
                  ? dallaemfitWidth + 12
                  : 0,
            width:
              gatheringType === 'WORKATION'
                ? isDallaemfitHovered
                  ? dallaemfitWidth
                  : workationWidth
                : isWorkationHovered
                  ? workationWidth
                  : dallaemfitWidth,
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
        className="mt-[10px] flex gap-2 xs:mt-[14px]"
      >
        <button
          type="button"
          onClick={handleElementClick}
          id="ALL"
          className={`${
            isAllActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'
          } rounded-xl px-3 py-2 text-sm`}
        >
          전체
        </button>
        <button
          type="button"
          onClick={handleElementClick}
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
          onClick={handleElementClick}
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
