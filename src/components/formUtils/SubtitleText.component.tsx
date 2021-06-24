import React from 'react';

/**
 * PROPS
 * @text string
 */

const SubtitleText = (props: { text: string }) => {
  return <div className='subtitleText'>{props.text}</div>;
};

export default SubtitleText;
