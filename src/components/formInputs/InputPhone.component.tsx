import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import {
  Istring,
  IinputStringHandler,
} from '../../models/components.interfaces';
import { ValidationAlert } from '../formUtils';

const InputPhone = (props: IinputStringHandler): JSX.Element => {
  const [InputPhone, setInputPhone] = useState<Istring>({
    InputPhone: props.value || '',
  });
  const [error, setError] = useState<boolean>(false);

  const handleInputBlur = (): void => {
    if (InputPhone.InputPhone.length === 11) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleInputPhone = (e: React.ChangeEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    setInputPhone({
      ...InputPhone,
      InputPhone: value,
    });
    if (value.length === 11) {
      props.handleInputChange(name, value);
    } else {
      props.handleInputChange(name, '');
    }
  };

  return (
    <>
      <NumberFormat
        name={props.name}
        onChange={handleInputPhone}
        value={InputPhone.InputPhone}
        placeholder={props.placeholder}
        format='### #######'
        mask=''
        required
        allowNegative={false}
        className={error ? 'error' : undefined}
        onBlur={handleInputBlur}
      />

      {error ? (
        <ValidationAlert
          content={'Revisa el número de celular de contacto ingresado.'}
        />
      ) : null}
    </>
  );
};
export default InputPhone;
