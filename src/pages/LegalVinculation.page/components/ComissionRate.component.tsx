import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { Ihandler, Istring } from '../../../models/components.interfaces';
import { ValidationAlert } from '../../../components/formUtils';

const ComissionRate = (props: Ihandler): JSX.Element => {
  const [comissionRate, setComissionRate] = useState<Istring>({
    comissionRate: '',
  });
  const [error, setError] = useState<boolean>(false);

  const handleInputComission = (e: React.ChangeEvent): void => {
    const { name, value } = e.target as HTMLInputElement;

    props.handleInputChange(name, value);
    setComissionRate({
      ...comissionRate,
      comissionRate: value,
    });
  };

  const handleBlur = (): void => {
    if (comissionRate.comissionRate) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <NumberFormat
        name='comissionRate'
        onChange={handleInputComission}
        placeholder='Tasa de comisión'
        format='##'
        mask=''
        allowNegative={false}
        required
        className={error ? 'error' : undefined}
        onBlur={handleBlur}
      />
      {error ? (
        <ValidationAlert content={'Tasa de comisión inválida.'} />
      ) : null}
    </>
  );
};
export default ComissionRate;
