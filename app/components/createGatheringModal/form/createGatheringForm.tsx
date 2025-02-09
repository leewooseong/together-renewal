import {Controller, useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';

import {formatDateTimeForAPI, getInitialDate} from '../../../utils/calendar';
import {LOCATION_MAP} from '../../../utils/createGathering';
import {createGatheringSchema, GatheringFormSchema} from '../../../utils/validation';

import {useState} from 'react';
import {useCreateGatheringMutation} from '../../../queries/gathering/useCreateGatheringMutation';
import {TimeInfo} from '../../../types/common/time.types';
import {CodeitError} from '../../../types/error.types';
import {ErrorMessageType} from '../../../types/gatherings/createGathering.types';
import {Capacity} from './capacity';
import ErrorInfo from './errorInfo';
import {GatheringDateTimePicker} from './gatheringDateTimePicker';
import {GatheringNameInput} from './gatheringNameInput';
import {ImageUpload} from './imageUpload';
import {LocationSelect} from './locationSelect';
import {ServiceTypeSelect} from './serviceTypeSelect';
import {SubmitButton} from './submitButton';

type CreateGatheringFormProps = {
  onClose: () => void;
};

export function CreateGatheringForm({onClose}: CreateGatheringFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<GatheringFormSchema>({
    resolver: zodResolver(createGatheringSchema),
    defaultValues: {
      name: '',
      location: undefined,
      image: undefined,
      type: 'OFFICE_STRETCHING',
      dateTime: getInitialDate(),
      registrationEnd: getInitialDate(),
      capacity: undefined,
    },
    mode: 'all',
  });

  const [serverErrorMessage, setServerErrorMessage] = useState<ErrorMessageType>({
    name: '',
    location: '',
    image: '',
    type: '',
    dateTime: '',
    registrationEnd: '',
    capacity: '',
  });

  console.log(serverErrorMessage);

  const {createGatheringMutation} =
    useCreateGatheringMutation<ErrorMessageType>(setServerErrorMessage);

  const getGatheringFormData = (data: GatheringFormSchema): FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        switch (key) {
          case 'dateTime':
          case 'registrationEnd':
            formData.append(key, formatDateTimeForAPI(value as TimeInfo));
            break;
          case 'capacity':
            formData.append(key, value.toString());
            break;
          case 'image':
            if (value instanceof File) {
              formData.append(key, value);
            }
            break;
          default:
            formData.append(key, String(value));
        }
      }
    });

    return formData;
  };

  // todo: Suspense 적용해서 응답 대기하는 동안 스피너 보여주도록 수정
  // todo: react-query 에러처리
  const onSubmit = async (data: GatheringFormSchema) => {
    const gatheringFormData = getGatheringFormData(data);
    createGatheringMutation.mutate(gatheringFormData, {
      onSuccess: onClose,
      onError: error => {
        if (error instanceof CodeitError) {
          const {parameter, message} = error;
          parameter && setServerErrorMessage(prev => ({...prev, [parameter]: message}));
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <GatheringNameInput register={register} registerKey="name" label="모임 이름" />
        <ErrorInfo type="name" message={errors.name?.message || serverErrorMessage.name} />
      </div>
      <div>
        <Controller
          control={control}
          name="location"
          render={({field}) => (
            <LocationSelect
              value={field.value}
              onChange={field.onChange}
              options={LOCATION_MAP}
              error={errors.location}
            />
          )}
        />
        <ErrorInfo
          type="location"
          message={errors.location?.message || serverErrorMessage.location}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="image"
          render={({field}) => <ImageUpload value={field.value} onChange={field.onChange} />}
        />
        <ErrorInfo type="image" message={errors.image?.message || serverErrorMessage.image} />
      </div>
      <div>
        <Controller
          control={control}
          name="type"
          render={({field}) => <ServiceTypeSelect value={field.value} onChange={field.onChange} />}
        />
        <ErrorInfo type="type" message={errors.type?.message || serverErrorMessage.type} />
      </div>
      <div className="flex flex-wrap justify-between gap-2 tablet:flex-nowrap">
        <div className="relative">
          <Controller
            control={control}
            name="dateTime"
            render={({field}) => (
              <GatheringDateTimePicker
                label="모임 날짜"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <ErrorInfo
            type="dateTime"
            message={errors.dateTime?.message || serverErrorMessage.dateTime}
          />
        </div>
        <div className="relative">
          <Controller
            control={control}
            name="registrationEnd"
            render={({field}) => (
              <GatheringDateTimePicker
                label="마감 날짜"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <ErrorInfo
            type="registrationEnd"
            message={errors.registrationEnd?.message || serverErrorMessage.registrationEnd}
          />
        </div>
      </div>
      <div>
        <Capacity register={register} registerKey="capacity" label="모집 정원" />
        <ErrorInfo
          type="capacity"
          message={errors.capacity?.message || serverErrorMessage.capacity}
        />
      </div>
      <SubmitButton />
    </form>
  );
}
