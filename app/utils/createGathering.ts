import {LOCATIONS} from '../constants/commonConstants';
import {SelectItem} from '../types/gatherings/createGathering.types';

export const LOCATION_MAP: SelectItem[] = LOCATIONS.reduce(
  (acc, location) => [...acc, {value: location, label: location}],
  [] as SelectItem[],
);
