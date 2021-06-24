import React, { useState, ChangeEvent } from 'react';
import { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { Istring } from '../../models/components.interfaces';
import { IInputDocument } from '../../models/index';
import { ValidationAlert } from '../formUtils';

const InputDocument = (props: IInputDocument): JSX.Element => {
  const [document, setDocument] = useState<Istring>({
    document: '',
  });

  const [error, setError] = useState<boolean>(false);

  const handleBlur = (): void => {
    if (document.document.length > 6 && document.document.length < 14) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (e: ChangeEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    setDocument({
      document: value,
    });
    if (
      value.length >= handleFormatMin(props.selectedValue) &&
      value.length <= handleFormatMax(props.selectedValue)
    ) {
      props.handleInputChange(name, value);
    } else {
      props.handleInputChange(name, '');
    }
  };

  const handleFormatMax = (value: string | undefined) => {
    switch (value) {
      case 'CC':
        return 13;
      case 'CE':
        return 10;
      case 'NIT':
        return 13;
      default:
        return 13;
    }
  };

  const handleFormatMin = (value: string | undefined) => {
    switch (value) {
      case 'CC':
        return 10;
      case 'CE':
        return 7;
      case 'NIT':
        return 12;
      default:
        return 7;
    }
  };

  useEffect((): void => {
    setDocument({
      document: '',
    });
    props.handleInputChange(props.name, document.document);
  }, [props.selectedValue]);

  return (
    <div className='flex-div'>
      <NumberFormat
        name={props.name}
        onChange={handleChange}
        placeholder={'Número de documento'}
        value={document.document}
        displayType={'input'}
        maxLength={handleFormatMax(props.selectedValue)}
        minLength={handleFormatMin(props.selectedValue)}
        thousandSeparator={'.'}
        decimalSeparator={'-'}
        allowNegative={false}
        mask=' '
        autoComplete={'0'}
        className={'document ' + (error ? 'error' : 'valid')}
        onBlur={handleBlur}
        isAllowed={(values) => {
          const {
            formattedValue,
            floatValue,
          }: { formattedValue: string; floatValue: any } = values;
          return formattedValue === '' || floatValue <= 9999999999999;
        }}
      />
      {error ? (
        <ValidationAlert content='Número de documento Invalido' />
      ) : null}
    </div>
  );
};

export default InputDocument;
