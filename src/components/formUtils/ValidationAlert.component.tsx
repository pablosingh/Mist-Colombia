import React from 'react';

interface IValidatioAlertProps {
  content: string;
}

const ValidationAlert = ({ content }: IValidatioAlertProps) => {
  return <div className='validationAlert'>{content}</div>;
};

export default ValidationAlert;
