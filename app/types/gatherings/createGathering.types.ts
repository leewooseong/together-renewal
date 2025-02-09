import {FieldError, FieldErrorsImpl, FieldValues, UseFormRegister} from 'react-hook-form';

import {z} from 'zod';

import {LOCATIONS, SERVICE_TYPES} from '../../constants/commonConstants';
import {timeInfoSchema} from '../../utils/validation';
import {ValueOf} from '../util.types';

export type ServiceType = ValueOf<typeof SERVICE_TYPES>;
export type LocationType = (typeof LOCATIONS)[number];

export type CreateGathering = {
  location: LocationType | null;
  type: ServiceType;
  name: string;
  dateTime: string; // YYYY-MM-DDTHH:MM:SS
  capacity: number | null;
  image: File | null;
  registrationEnd: string; // YYYY-MM-DDTHH:MM:SS
};

// export type CreateGatheringState = Omit<CreateGathering, 'dateTime' | 'registrationEnd'> & {
//   dateTime: TimeInfo;
//   registrationEnd: TimeInfo;
// };

export type InputProps<T> = {
  value: T;
  onChange: (value: T) => void;
  error?: FieldError;
};

export type UnControlledInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  registerKey: keyof T;
  label: string;
  error?: FieldError;
};

export type SelectItem = {value: (typeof LOCATIONS)[number]; label: (typeof LOCATIONS)[number]};
export type SelectProps = InputProps<string | null> & {
  options: SelectItem[];
};

export type DateTimePickerProps = InputProps<TimeInfo> & {
  label: string;
  error?: FieldError | FieldErrorsImpl<TimeInfo>;
};

// TimeInfo 타입 추론
export type TimeInfo = z.infer<typeof timeInfoSchema>;
