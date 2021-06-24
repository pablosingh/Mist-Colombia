import React, { useState, useEffect } from 'react';
import checkMark from '../../assets/vectors/checkMark.svg';

interface IChecked {
  checked: boolean | undefined;
  handleCheck: (boolean: boolean) => void;
}

/**
 *
 * @checked : boolean,
 * @handleCheck : (boolean: boolean) => void;
 */

export default function CustomCheckbox(props: IChecked) {
  const [checked, setChecked] = useState(props.checked);

  const handleClick = (): void => {
    setChecked(!checked);
    props.handleCheck(!checked);
  };

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <span
      className={'customCheckbox ' + (checked ? 'customCheckboxChecked' : '')}
      onClick={handleClick}
    >
      {checked ? <img src={checkMark} alt='' /> : ''}
    </span>
  );
}
