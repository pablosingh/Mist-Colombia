import React from 'react';

/**
 * PROPS
 * @text string
 */

const ServiceOption = ({ text }: { text: string }) => {
  return <div className='serviceOption'>{text}</div>;
};

export default ServiceOption;
