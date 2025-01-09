'use client';

import {getDefaultStore, Provider} from 'jotai';
import {DevTools} from 'jotai-devtools';
import 'jotai-devtools/styles.css';

export function JotaiProvider({children}: {children: React.ReactNode}) {
  return (
    <Provider>
      <DevTools store={getDefaultStore()} />
      {children}
    </Provider>
  );
}
