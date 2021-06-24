import React from 'react';
interface IDayProps {
  day: string;
}

const DaySchedule = ({ day }: IDayProps) => {
  return (
    <div className='daySchedule'>
      <input type='checkbox' />
      <div className='day'>{day}</div>
      <input className='schedule' type='text' />
      <input className='schedule' type='text' />
    </div>
  );
};

export default DaySchedule;
