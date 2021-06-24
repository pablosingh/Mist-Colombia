import React, { useState } from 'react';
import DailyHours from './DailyHours.component';
import { days } from '../../../models/enums';
import { ToggleAndText, TableHeaders } from '../../../components/texts/';
import { useEffect } from 'react';
import { IBussinessHoursTable } from '../../../models/rxjsInterfaces';

// This component shows the business hours tabl including theheaders the daily hours and the toggle button

const BussinessHoursTable = ({
  getState,
  setState,
  obs,
  expertName,
}: IBussinessHoursTable): JSX.Element => {
  const [toggled, setToggled] = useState(false);
  const observable = obs();

  let state = getState();

  // The handleToggle function changes between true or false the status of the component in the local state
  // and in the Rx state
  const handleToggle = () => {
    setToggled(!toggled);
    state = getState();
    state[expertName].toggle();
    setState({
      ...state,
      [expertName]: {
        ...state[expertName],
        activeToggle: !state[expertName].activeToggle,
      },
    });
  };

  useEffect(() => {
    // This useEffect update the the Toggled button status with the observable
    const aux = observable.subscribe((data) => {
      setToggled(data[expertName]?.activeToggle);
    });
    return () => aux.unsubscribe();
  }, [observable]);

  return (
    <div className='hoursTable'>
      <TableHeaders />
      {Object.values(days).map((day, i) => (
        <DailyHours
          key={i}
          day={day}
          schedule={state[expertName].schedule.find((el) => el.day === day)}
          toggled={toggled} // This property refers to the status of the toggle button
          checked={
            state[expertName].schedule.find((el) => el.day === day) !==
            undefined
          } // This property refers to the status of checkbox for each day
          expertName={expertName}
        />
      ))}
      <ToggleAndText
        toggled={toggled}
        handleToggleChange={handleToggle}
        text='Todos los dias a la misma hora'
      />
    </div>
  );
};

export default BussinessHoursTable;
