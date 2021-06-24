import React, { ChangeEvent, useState } from 'react';
import '../../styles/Css/index.css';
import { IinputStringHandler } from '../../models/components.interfaces';
import { ValidationAlert } from '../formUtils';

/**
 * PROPS
 * @name string
 * @placeholder string
 * @handleInputChange (name: string, value: string | number | null) => void
 */

const InputTextNameAlpha = (props: IinputStringHandler): JSX.Element => {
  const [text, setText] = useState<string>(props.value || '');
  const [error, setError] = useState<boolean>(false);

  /* 
    Reusable component for Alphabetical inputs
    Allows only letters (lower and upper case)
  */

  const handleBlur = (): void => {
    if (text) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target as HTMLInputElement;
    const regex = /^[a-zA-Z\s]*$/;
    const isValid = regex.test(value);

    if (isValid) {
      setText(value);
      props.handleInputChange(name, value);
    }
  };

  return (
    <>
      <input
        name={props.name}
        value={text}
        type='text'
        placeholder={props.placeholder}
        onChange={handleChange}
        className={error ? 'error' : undefined}
        onBlur={handleBlur}
      />
      {error ? (
        <ValidationAlert content={props.placeholder + ' Invalido'} />
      ) : null}
    </>
  );
};

export default InputTextNameAlpha;
