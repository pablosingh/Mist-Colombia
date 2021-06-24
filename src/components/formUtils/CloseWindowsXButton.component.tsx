import React from 'react';
import closeButton from '../../assets/vectors/closeButton.svg';

/** PROPS
 * @handleClick : () => void
 */

export default function CloseWindowButton(props: { handleClick: () => void }) {
  return (
    <button className='noBackgroundButton' onClick={() => props.handleClick()}>
      <img src={closeButton} alt='cerrar' />
    </button>
  );
}
