import React, { ChangeEvent, useState } from 'react';
import { IselectProps } from '../../models/components.interfaces';

function SelectInput({
  handleInputChange,
  selectValues,
  inputType,
  placeholder,
  value,
}: IselectProps) {
  const [input, setInput] = useState<string>(value ? value : '');
  const [error, setError] = useState<boolean>(false);

  const handleBlur = (): void => {
    if (input) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <select
      className={error ? 'error selectInput' : 'selectInput'}
      name={inputType}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        setInput(e.target.value);
        handleInputChange(e.target.name, e.target.value);
      }}
      required
      onBlur={handleBlur}
    >
      <option defaultValue='' disabled hidden selected>
        {value ? value : placeholder}
      </option>
      {selectValues.map((el, id) => {
        return (
          <option key={id} value={el}>
            {el}
          </option>
        );
      })}
    </select>
  );
}

export default SelectInput;
