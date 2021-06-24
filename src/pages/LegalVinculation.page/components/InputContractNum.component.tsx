import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { ValidationAlert } from '../../../components/formUtils';
import {
  IinputStringHandler,
  Istring,
} from '../../../models/components.interfaces';

/**
 * PROPS
 * @name string,
 * @handleInputChange (name: string, value: string | number | null) => void
 */

const InputContractNum = (props: IinputStringHandler): JSX.Element => {
  const [contractNumber, setContractNumber] = useState<Istring>({
    contractNumber: '',
  });
  const [error, setError] = useState<boolean>(false);

  const handleBlur = (): void => {
    if (contractNumber.contractNumber) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleInputContract = (e: React.ChangeEvent): void => {
    const { name, value } = e.target as HTMLInputElement;

    props.handleInputChange(name, value);
    setContractNumber({
      ...contractNumber,
      contractNumber: value,
    });
  };

  return (
    <>
      <NumberFormat
        name='referenceNumber'
        onChange={handleInputContract}
        placeholder='Número de referencia del contrato'
        format='##########'
        mask=''
        allowNegative={false}
        required
        className={error ? 'error' : undefined}
        onBlur={handleBlur}
      />
      {error ? (
        <ValidationAlert
          content={'Número de referencia del contrato inválido.'}
        />
      ) : null}
    </>
  );
};

export default InputContractNum;
