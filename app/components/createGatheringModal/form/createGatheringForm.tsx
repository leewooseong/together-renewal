import {useState} from 'react';

import {
  CreateGathering,
  CreateGatheringState,
} from '../../../types/gatherings/createGathering.types';
import {ValueOf} from '../../../types/util.types';
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
  const [formData, setFormData] = useState<CreateGatheringState>({
    name: '',
    location: null,
    image: null,
    type: 'OFFICE_STRETCHING',
    dateTime: getInitialDate(),
    registrationEnd: getInitialDate(),
    capacity: 0,
  });

  const handleInputChange = (
    field: keyof CreateGathering,
    value: ValueOf<CreateGatheringState>,
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form className="flex flex-col gap-6">
      <GatheringNameInput
        value={formData.name}
        onChange={value => handleInputChange('name', value)}
      />
      <LocationSelect
        value={formData.location}
        onChange={value => handleInputChange('location', value)}
        options={LOCATION_MAP} // 장소 옵션 추가 필요
      />
      <ImageUpload value={formData.image} onChange={file => handleInputChange('image', file)} />
      <ServiceTypeSelect
        value={formData.type}
        onChange={value => handleInputChange('type', value)}
      />
      <div className="flex flex-wrap justify-between gap-2 tablet:flex-nowrap">
        <GatheringDateTimePicker
          name="모임 날짜"
          value={formData.dateTime}
          onChange={value => handleInputChange('dateTime', value)}
        />
        <GatheringDateTimePicker
          name="마감 날짜"
          value={formData.registrationEnd}
          onChange={value => handleInputChange('registrationEnd', value)}
        />
      </div>
      <Capacity
        value={formData.capacity}
        onChange={value => handleInputChange('capacity', value)}
      />
      <SubmitButton />
    </form>
  );
}
