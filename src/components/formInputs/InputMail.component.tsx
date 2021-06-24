import React, { useState, ChangeEvent } from 'react';
import '../../styles/Css/index.css';
import {
  IinputStringHandler,
  Istring,
} from '../../models/components.interfaces';
import { ValidationAlert } from '../formUtils';

/**
 * PROPS
 * @name string,
 * @placeholder string,
 * @handleInputChange (name: string, value: string | number | null) => void
 */

const InputMail = (props: IinputStringHandler): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const [mail, setMail] = useState<Istring>({
    mail: props.value || '',
  });

  const handleBlur = (): void => {
    if (validEmail(mail.mail)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const validEmail = (value: string | number | null) => {
    value = `${value}`;
    const regex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return regex.test(value);
  };

  const handleChange = (e: ChangeEvent): void => {
    const { name, value } = e.target as HTMLInputElement;

    setMail({
      mail: value,
    });

    if (validEmail(value)) {
      props.handleInputChange(name, value);
    } else {
      props.handleInputChange(name, '');
    }
  };

  return (
    <>
      <input
        type='text'
        onChange={handleChange}
        name={props.name}
        value={mail.mail}
        placeholder={props.placeholder}
        className={error ? 'error' : undefined}
        onBlur={handleBlur}
      />
      {error ? (
        <ValidationAlert content={props.placeholder + ' Invalido'} />
      ) : null}
    </>
  );
};

export default InputMail;
