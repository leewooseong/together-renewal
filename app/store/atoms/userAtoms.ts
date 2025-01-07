import {TOKEN_NAME} from '@/app/constants/auth';
import {atom} from 'jotai';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {User} from '../types/user.types';

// userInfoAtom
// - 유저 정보 저자용 atom
const userInfoAtom = atom<User | null>(null);
userInfoAtom.debugLabel = 'userInfo';

// tokenWithStorageAtom
// - token 저장용 atom
// - sessionStorage 이용
const sessionStorageProvider = createJSONStorage<string | null>(() => sessionStorage);

const tokenWithStorageAtom = atomWithStorage<string | null>(
  TOKEN_NAME,
  null,
  sessionStorageProvider,
);
tokenWithStorageAtom.debugLabel = 'token with storage';

export {tokenWithStorageAtom, userInfoAtom};
