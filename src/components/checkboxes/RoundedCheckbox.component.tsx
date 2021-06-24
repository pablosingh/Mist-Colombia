import React, { useState, useEffect } from 'react';

interface IRoundedCheckbox {
  name: string;
  text: string;
  handleCheckboxClick: (text: string) => void;
  checked: boolean;
}

/**
 *
 * @name: string; input state name
 * @text: string;
 * @handleCheckboxClick: (name: string, text:string) => void;
 * @checked: boolean;
 */

export default function RoundedCheckbox(props: IRoundedCheckbox) {
  const [checked, setChecked] = useState<boolean>(props.checked);

  const handleClick = (): void => {
    setChecked(!checked);
    props.handleCheckboxClick(props.text);
  };

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <div
      className={'RoundedCheckbox ' + (checked ? 'RoundedCheckboxChecked' : '')}
      onClick={handleClick}
    >
      {props.text}
    </div>
  );
}
