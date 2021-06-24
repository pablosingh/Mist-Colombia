import React, { useState, useEffect } from 'react';

interface Iboolean {
  toggled: boolean;
  handleToggle: (toggled: boolean) => void;
}

/**
 *
 * @toggled : boolean
 * @handleToggle : (toggled:boolean) => void
 */

export default function ToggleCheckbox(props: Iboolean) {
  const [toggled, setToggled] = useState<boolean>(false);

  const handleClick = (): void => {
    setToggled(!toggled);
    props.handleToggle(!toggled);
  };

  useEffect(() => {
    setToggled(props.toggled);
  }, [props.toggled]);

  return (
    <div
      className={
        'checkboxContainer ' + (!toggled ? 'checkboxContainerlight' : '')
      }
      onClick={handleClick}
    >
      <span
        className={'checkboxDot ' + (toggled ? 'checkboxDotRight' : '')}
      ></span>
    </div>
  );
}
