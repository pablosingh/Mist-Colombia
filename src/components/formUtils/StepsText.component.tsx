import React from 'react';
interface IStepsProps {
  text: string;
}

/**
 *
 * PROPS
 * @text string
 */

const StepsText = ({ text }: IStepsProps) => {
  return <div className='StepsText'>{text}</div>;
};

export default StepsText;
