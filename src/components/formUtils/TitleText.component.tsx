import React from 'react';

interface ITitleProps {
  text: string;
}

/**
 *
 * PROPS
 * @text string
 */

const TitleText = ({ text }: ITitleProps) => {
  return <div className='TitleText'>{text}</div>;
};

export default TitleText;
