import React, { useEffect } from 'react';
import '../../styles/Css/index.css';
import { IinputPasswordHandler } from '../../models/components.interfaces';
import { useState, ChangeEvent, MouseEvent } from 'react';
import Eye from '../../assets/vectors/hide.svg';
import View from '../../assets/vectors/view.svg';

/**
 * PROPS
  @name: string;
  @placeholder: string;
  @handleInputChange: (name: string, value: string | undefined) => void;
 */

export default function InputPassword(
  props: IinputPasswordHandler
): JSX.Element {
  const [pass, setPass] = useState<string>('');
  const [type, setType] = useState<string>('password');
  const regexp = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  const changing = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPass(value);
    if (regexp.test(value)) {
      props.handleInputChange(props.name, value);
    } else {
      props.handleInputChange(props.name, '');
    }
  };

  const showPass = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (type === 'password') setType('text');
    else if (type === 'text') setType('password');
    else setType('password');
  };
  useEffect(() => {}, [props.errormessage]);

  return (
    <div className='passwordGroup'>
      <label>{props.placeholder}</label>
      <input
        type={type}
        name={props.name}
        placeholder={`${props.placeholder}`}
        onChange={changing}
        value={pass}
      />
      {props.errormessage && pass.length > 1 ? (
        <span>{props.errormessage}</span>
      ) : null}
      <i onClick={showPass}>
        {type === 'password' ? (
          <img className='eyeView' src={Eye} alt='show' />
        ) : (
          <img className='eyeView' src={View} alt='hide' />
        )}
      </i>
    </div>
  );
}
