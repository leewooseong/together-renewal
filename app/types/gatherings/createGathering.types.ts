import {FieldError, FieldErrorsImpl, FieldValues, UseFormRegister} from 'react-hook-form';

import {LOCATIONS, SERVICE_TYPES} from '../../constants/commonConstants';
import {GatheringFormSchema} from '../../utils/validation';
import {TimeInfo} from '../common/time.types';
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

export type CreateGatheringFormData = {
  location: LocationType;
  type: ServiceType;
  name: string;
  dateTime: string; // YYYY-MM-DDTHH:MM:SS
  capacity: number;
  image: File;
  registrationEnd: string; // YYYY-MM-DDTHH:MM:SS
};

export type ErrorMessageType = {
  [K in keyof GatheringFormSchema]: string;
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
  error?: string;
};

export type SelectItem = {value: (typeof LOCATIONS)[number]; label: (typeof LOCATIONS)[number]};
export type SelectProps = InputProps<string | null> & {
  options: SelectItem[];
};

export type DateTimePickerProps = InputProps<TimeInfo> & {
  label: string;
  error?: FieldError | FieldErrorsImpl<TimeInfo>;
};
