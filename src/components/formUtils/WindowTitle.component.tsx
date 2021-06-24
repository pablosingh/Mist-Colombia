import React from 'react';

interface ITextProps {
  text: string;
}

/**
 *
 * PROPS
 * @text string
 */

const WindowTitle = (props: ITextProps) => {
  return <div className='WindowTitle'>{props.text}</div>;
};

export default WindowTitle;
