import React from 'react';

interface IDay {
  day: string;
  active: boolean | undefined;
}

/**
 * PROPS
 * @day : string
 */

const DayLabel = ({ day }: IDay): JSX.Element => {
  return <div className='dayLabel'>{day}</div>;
};

export default DayLabel;
