import {LOCATIONS, TYPES} from '../../constants/commonConstants';

export type CreateGathering = {
  location: (typeof LOCATIONS)[number];
  type: (typeof TYPES)[number];
  name: string;
  dateTime: string;
  capacity: number;
  image: string;
  registrationEnd: string;
};
