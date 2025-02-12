'use client';

import {Suspense} from 'react';

import {TextRender} from '../../components/common/textRender';
import {LikedContents} from '../../components/liked/likedContents';

export default function likedPage() {
  return (
    <Suspense fallback={<TextRender effect="bounce" text="페이지 로딩 중..." />}>
      <LikedContents />
    </Suspense>
  );
}
