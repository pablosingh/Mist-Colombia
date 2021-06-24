import React from 'react';
import { ToggleCheckbox } from '../checkboxes/';
import { ITitleProps } from '../../models/components.interfaces';

const ToggleAndText = ({ text, handleToggleChange, toggled }: ITitleProps) => {
  return (
    <div className='ToggleContainer'>
      <div className='ToggleText'>{text}</div>
      <ToggleCheckbox handleToggle={handleToggleChange} toggled={toggled} />
    </div>
  );
};

export default ToggleAndText;
