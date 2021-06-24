import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { Ihandler, Istring } from '../../../models/components.interfaces';
import { ValidationAlert } from '../../../components/formUtils';

/**
 * PROPS
 * @name string,
 * @handleInputChange (name: string, value: string | number | null) => void
 */

const InputTrialTime = (props: Ihandler): JSX.Element => {
  const [trialTime, setTrialTime] = useState<Istring>({
    trialTime: '',
  });
  const [error, setError] = useState<boolean>(false);

  const handleBlur = (): void => {
    if (trialTime.trialTime) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleInputTrial = (e: React.ChangeEvent): void => {
    const { name, value } = e.target as HTMLInputElement;

    props.handleInputChange(name, value);
    setTrialTime({
      ...trialTime,
      trialTime: value,
    });
  };

  return (
    <>
      <NumberFormat
        name='trialTime'
        onChange={handleInputTrial}
        placeholder='Tiempo de prueba'
        format='##'
        mask=''
        allowNegative={false}
        required
        className={error ? 'error' : undefined}
        onBlur={handleBlur}
      />
      {error ? (
        <ValidationAlert content={'Tiempo de prueba inválido.'} />
      ) : null}
    </>
  );
};

export default InputTrialTime;
