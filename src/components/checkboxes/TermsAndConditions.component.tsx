import React, { useState } from 'react';
import '../../styles/Css/index.css';
import { Link } from 'react-router-dom';
import { CustomCheckbox } from './';

interface ItermsAndConditionsProps {
  handleInputChange: (
    name: string,
    value: string | boolean | undefined
  ) => void;
}

const TermsAndConditions = (props: ItermsAndConditionsProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleClick = (): void => {
    setChecked(!checked);
    props.handleInputChange('checkbox', !checked);
  };

  return (
    <div className='labelCheck'>
      <CustomCheckbox handleCheck={handleClick} checked={checked} />
      <label>
        Acepto{' '}
        <Link className='terms' to='https://www.google.com'>
          Términos y condiciones
        </Link>
      </label>
    </div>
  );
};

export default TermsAndConditions;
