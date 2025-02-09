import {Controller, useForm} from 'react-hook-form';

import {CreateGatheringState} from '../../../types/gatherings/createGathering.types';
import {getInitialDate} from '../../../utils/calendar';
import {LOCATION_MAP} from '../../../utils/createGathering';

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
    // formState: {errors},
  } = useForm<CreateGatheringState>({
    defaultValues: {
      name: '',
      location: null,
      image: null,
      type: 'OFFICE_STRETCHING',
      dateTime: getInitialDate(),
      registrationEnd: getInitialDate(),
      capacity: null,
    },
  });

  const onSubmit = (data: CreateGatheringState) => {
    // API 호출 로직
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <GatheringNameInput register={register} registerKey="name" label="모임 이름" />
      <Controller
        control={control}
        name="location"
        render={({field}) => (
          <LocationSelect value={field.value} onChange={field.onChange} options={LOCATION_MAP} />
        )}
      />
      <Controller
        control={control}
        name="image"
        render={({field}) => <ImageUpload value={field.value} onChange={field.onChange} />}
      />
      <Controller
        control={control}
        name="type"
        render={({field}) => <ServiceTypeSelect value={field.value} onChange={field.onChange} />}
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
            />
          )}
        />
      </div>
      <Capacity register={register} registerKey="capacity" label="모집 정원" />
      <SubmitButton />
    </form>
  );
}
