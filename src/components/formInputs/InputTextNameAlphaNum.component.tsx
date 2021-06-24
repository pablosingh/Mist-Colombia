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

const InputTextNameAlphaNum = (props: IinputStringHandler): JSX.Element => {
  const [text, setText] = useState<string | undefined>(props.value);
  const [error, setError] = useState<boolean>(false);

  /*
    Reusable component for Alpha Numerical inputs
    Allows only letters (upper and lower case) and numbers (0-9)
  */

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target as HTMLInputElement;

    const regex = /^[0-9a-zA-Z\s]*$/;
    const isValid = regex.test(value);

    if (isValid) {
      setText(value);
      props.handleInputChange(name, value);
    }
  };

  const handleBlur = (): void => {
    if (text) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className='passwordGroup'>
      <input
        className={error ? 'error' : undefined}
        name={props.name}
        type='text'
        placeholder={props.placeholder}
        onChange={handleChange}
        value={text}
        onBlur={handleBlur}
      />
      {props.errormessage ? <span>{props.errormessage}</span> : null}
      {error ? (
        <ValidationAlert content={props.placeholder + ' Invalido'} />
      ) : null}
    </div>
  );
};

export default InputTextNameAlphaNum;
