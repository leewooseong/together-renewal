import {atom} from 'jotai';
import {TwhatGatheringTypeAtom} from '../types/gatheringNav.types';

export const whatGatheringTypeAtom = atom<TwhatGatheringTypeAtom>('DALLAEMFIT');

export const getWhatGatheringTypeAtom = atom(get => get(whatGatheringTypeAtom));
