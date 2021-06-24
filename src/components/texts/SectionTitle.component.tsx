import React from 'react';

interface ITitleProps {
  text: string;
}

/**
 *
 * @param text : string
 * @returns
 */

const Sectiontitle = ({ text }: ITitleProps) => {
  return <div className='SectionTitle'>{text}</div>;
};

export default Sectiontitle;
