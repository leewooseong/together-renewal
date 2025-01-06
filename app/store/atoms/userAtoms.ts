import {atom} from 'jotai';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';

// userInfoAtom
// - 유저 정보 저자용 atom
export interface User {
  teamId: number;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const userInfoAtom = atom<User | null>(null);
userInfoAtom.debugLabel = 'userInfo';

// tokenWithStorageAtom
// - token 저장용 atom
// - sessionStorage 이용
const sessionStorageProvider = createJSONStorage<string | null>(() => sessionStorage);

const tokenWithStorageAtom = atomWithStorage<string | null>(
  'auth-token',
  null,
  sessionStorageProvider,
);
tokenWithStorageAtom.debugLabel = 'token with storage';

export {tokenWithStorageAtom, userInfoAtom};
