import {FieldValues, UseFormRegister} from 'react-hook-form';

import {HOURS, MINUTES, PERIOD} from '../../constants/calendar';
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

export type CreateGatheringState = Omit<CreateGathering, 'dateTime' | 'registrationEnd'> & {
  dateTime: TimeInfo;
  registrationEnd: TimeInfo;
};

export type InputProps<T> = {
  value: T;
  onChange: (value: T) => void;
  error?: string;
};

export type UnControlledInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  registerKey: keyof T;
  label: string;
};

export type SelectItem = {value: (typeof LOCATIONS)[number]; label: (typeof LOCATIONS)[number]};
export type SelectProps = InputProps<string | null> & {
  options: SelectItem[];
};

export type DateTimePickerProps = InputProps<TimeInfo> & {
  label: string;
};

export type TimeInfo = {
  selectedDate: Date;
  selectedHour: ValueOf<typeof HOURS>;
  selectedMinute: ValueOf<typeof MINUTES>;
  selectedPeriod: ValueOf<typeof PERIOD>;
};
