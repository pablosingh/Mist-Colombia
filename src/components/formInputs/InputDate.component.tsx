import React, { useState } from 'react';
import {
  IinputStringHandler,
  Istring,
} from '../../models/components.interfaces';

const InputDate = (props: IinputStringHandler): JSX.Element => {
  const [inputDate, setInputDate] = useState<Istring>({
    InputDate: '',
  });
  const [error, setError] = useState<boolean>(false);

  const handleBlur = (): void => {
    if (inputDate) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleInputDate = (e: React.ChangeEvent): void => {
    const { name, value } = e.target as HTMLInputElement;

    props.handleInputChange(name, value);
    setInputDate({
      ...InputDate,
      InputDate: value,
    });
  };

  return (
    <input
      name={props.name}
      placeholder={props.placeholder}
      onChange={handleInputDate}
      type='date'
      required
      className={error ? 'error' : undefined}
      onBlur={handleBlur}
    />
  );
};
export default InputDate;
