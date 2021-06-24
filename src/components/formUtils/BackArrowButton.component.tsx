import React from 'react';
import { useHistory } from 'react-router-dom';
import arrowBack from '../../assets/vectors/arrowBack.svg';

export default function BackArrowButton() {
  const history = useHistory();

  const handleClick = (): void => {
    history.goBack();
  };

  return (
    <button className='noBackgroundButton' onClick={handleClick}>
      <img src={arrowBack} alt='' />
    </button>
  );
}
