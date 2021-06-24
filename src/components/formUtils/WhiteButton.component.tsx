import React from 'react';

interface IWhiteButton {
  text: string;
  handleClick: () => void;
}

/** PROPS
 * @text : string
 * @handleClick : () => void
 */

export default function WhiteButton(props: IWhiteButton) {
  return (
    <button className='whiteButton' onClick={() => props.handleClick()}>
      {props.text}
    </button>
  );
}
