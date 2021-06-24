import React from 'react';
import '../../styles/Css/index.css';

interface IProps {
  handleClick: () => void;
}

const ButtonExpert = (props: IProps) => {
  return (
    <div className='buttonExpertAdd' onClick={props.handleClick}>
      + Agregar otro especialista
    </div>
  );
};

export default ButtonExpert;
