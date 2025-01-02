// atoms/userAtom.ts
import {atom} from 'jotai';

export interface User {
  id: string;
  email: string;
  name: string;
}

export const userAtom = atom<User | null>(null);
