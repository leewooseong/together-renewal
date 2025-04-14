'use client';

import {useLayoutEffect, useState} from 'react';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';

import {PageType} from '../types/common/server.types';
import {getPageType} from '../utils/server';

export const useCustomRouter = () => {
  const path = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const [pageType, setPageType] = useState<PageType>('public');

  useLayoutEffect(() => {
    setPageType(getPageType(path));
  }, [path, params]);

  return {pageType, router};
};
