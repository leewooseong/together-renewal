import {atom} from 'jotai';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';

export interface User {
  id: string;
  email: string;
  name: string;
}

export const userInfoStore = atom<User | null>(null);

const sessionStorageProvider = createJSONStorage<string | null>(() => sessionStorage);
export const tokenWithStorageStore = atomWithStorage<string | null>(
  'auth-token',
  null,
  sessionStorageProvider,
);
