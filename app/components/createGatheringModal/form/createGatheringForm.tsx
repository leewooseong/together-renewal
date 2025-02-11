import {Controller, FieldError, useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';

import {getInitialDate} from '../../../utils/calendar';
import {LOCATION_MAP} from '../../../utils/createGathering';
import {createGatheringSchema, GatheringFormSchema} from '../../../utils/validation';

import {Capacity} from './capacity';
import {GatheringDateTimePicker} from './gatheringDateTimePicker';
import {GatheringNameInput} from './gatheringNameInput';
import {ImageUpload} from './imageUpload';
import {LocationSelect} from './locationSelect';
import {ServiceTypeSelect} from './serviceTypeSelect';
import {SubmitButton} from './submitButton';

export function CreateGatheringForm() {
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

  const onSubmit = (data: GatheringFormSchema) => {
    // API 호출 로직
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <GatheringNameInput
        register={register}
        registerKey="name"
        label="모임 이름"
        error={errors.name}
      />
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
      <Controller
        control={control}
        name="image"
        render={({field}) => (
          <ImageUpload
            value={field.value}
            onChange={field.onChange}
            error={errors.image as FieldError}
          />
        )}
      />
      <Controller
        control={control}
        name="type"
        render={({field}) => (
          <ServiceTypeSelect value={field.value} onChange={field.onChange} error={errors.type} />
        )}
      />
      <div className="flex flex-wrap justify-between gap-2 tablet:flex-nowrap">
        <Controller
          control={control}
          name="dateTime"
          render={({field}) => (
            <GatheringDateTimePicker
              label="모임 날짜"
              value={field.value}
              onChange={field.onChange}
              error={errors.dateTime as FieldError}
            />
          )}
        />
        <Controller
          control={control}
          name="registrationEnd"
          render={({field}) => (
            <GatheringDateTimePicker
              label="마감 날짜"
              value={field.value}
              onChange={field.onChange}
              // error={fieldState.error as FieldError}
              error={errors?.registrationEnd as FieldError}
            />
          )}
        />
      </div>
      <Capacity
        register={register}
        registerKey="capacity"
        label="모집 정원"
        error={errors.capacity}
      />
      <SubmitButton />
    </form>
  );
}
