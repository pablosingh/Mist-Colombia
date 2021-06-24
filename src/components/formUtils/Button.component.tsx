import React from 'react';
import { IButton } from '../../models/components.interfaces';

/**
 *
 * props -> text, handleSubmit, isValid
 * @text must be a string
 * @handleSubmit must be a callback
 * @isValid must be a boolean
 */

const ButtonComponent = (props: IButton) => {
  return (
    <div
      className={props.isValid ? 'button isValid' : 'button'}
      onClick={props.handleSubmit}
    >
      {props.text}
    </div>
  );
};

export default ButtonComponent;
