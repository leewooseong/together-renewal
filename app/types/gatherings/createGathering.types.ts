import {LOCATIONS, SERVICE_TYPES} from '../../constants/commonConstants';
import {ValueOf} from '../util.types';

export type ServiceType = ValueOf<typeof SERVICE_TYPES>;

export type CreateGathering = {
  location: (typeof LOCATIONS)[number] | null;
  type: ServiceType;
  name: string;
  dateTime: string; // YYYY-MM-DDTHH:MM:SS
  capacity: number | null;
  image: File | null;
  registrationEnd: string; // YYYY-MM-DDTHH:MM:SS
};

export interface InputProps<T> {
  value: T;
  onChange: (value: T) => void;
  error?: string;
}

// export type RadioInputProps =

export type SelectItem = {value: (typeof LOCATIONS)[number]; label: (typeof LOCATIONS)[number]};
export interface SelectProps extends InputProps<string | null> {
  options: SelectItem[];
}
