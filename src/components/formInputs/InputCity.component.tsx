import React, { ChangeEvent, useState } from 'react';
import { Ihandler, Icity } from '../../models/components.interfaces';
import cities from '../../assets/colombiaCities.const.js';
import { ValidationAlert } from '../formUtils';

const InputCity = (props: Ihandler): JSX.Element => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const verify = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setInput(value);
    return cities.map((c) => c.municipio).includes(value)
      ? props.handleInputChange('idExpeditionCity', value)
      : props.handleInputChange('idExpeditionCity', '');
  };

  const handleBlur = (): void => {
    if (cities.map((c) => c.municipio).includes(input)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className='inputCity'>
      <input
        className={error ? 'error' : undefined}
        list='cities'
        value={input}
        name='cityInput'
        id='cityInput'
        onChange={verify}
        placeholder='Ingresa tu ciudad de expedición'
        onBlur={handleBlur}
      />
      <datalist id='cities'>
        {Array.isArray(cities)
          ? cities.map((c: Icity, i: number) => {
              return <option value={`${c.municipio}`} key={i} />;
            })
          : null}
      </datalist>
      {error ? (
        <ValidationAlert content={'Ingresa tu ciudad de expedición Invalido'} />
      ) : null}
    </div>
  );
};

export default InputCity;
