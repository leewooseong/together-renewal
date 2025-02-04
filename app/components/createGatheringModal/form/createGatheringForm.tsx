import {CreateGathering} from '../../../types/gatherings/createGathering.types';
import {ValueOf} from '../../../types/util.types';
import {LOCATION_MAP} from '../../../utils/createGathering';

import {Capacity} from './capacity';
import {DeadlineTImePicker} from './deadlineTImePicker';
import {GatheringNameInput} from './gatheringNameInput';
import {GatheringTimePicker} from './gatheringTimePicker';
import {ImageUpload} from './imageUpload';
import {LocationSelect} from './locationSelect';
import {ServiceTypeSelect} from './serviceTypeSelect';
import {SubmitButton} from './submitButton';

interface CreateGatheringFormProps {
  formData: CreateGathering;
  onChangeFormData: (field: keyof CreateGathering, value: ValueOf<CreateGathering>) => void;
}

export function CreateGatheringForm({formData, onChangeFormData}: CreateGatheringFormProps) {
  const handleInputChange = (field: keyof CreateGathering, value: ValueOf<CreateGathering>) => {
    onChangeFormData(field, value);
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
      <div className="flex flex-wrap gap-2 tablet:flex-nowrap tablet:gap-10">
        <GatheringTimePicker
          value={formData.dateTime}
          onChange={value => handleInputChange('dateTime', value)}
        />
        <DeadlineTImePicker
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
