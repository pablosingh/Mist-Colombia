import React from 'react';
import { ILabelText } from '../../models/components.interfaces';
import '../../styles/Css/index.css';

/**
 * props
 * @text : string
 * @disabled : boolean, optional. (Adds opacity 0.6 to the text)
 */

const LabelTextComponent = (props: ILabelText): JSX.Element => {
  return (
    <div className={'labelText' + (props.disabled ? ' disabledText' : '')}>
      {props.text}
    </div>
  );
};

export default LabelTextComponent;
