import React, { useState } from 'react';
import { Observable } from 'rxjs';
import DailyHours from './DailyHours.component';
import {
  SectionTitle,
  TableHeaders,
  ToggleAndText,
} from '../../../components/texts';
import { days } from '../../../models/enums';
import { IHours } from '../../../models/rxjsInterfaces';
import { useEffect } from 'react';

interface IBussinessHoursTable {
  getState: () => IHours;
  setState: (arg: IHours) => IHours | void;
  obs: () => Observable<IHours>;
}

// This component shows the business hours tabl including theheaders the daily hours and the toggle button

const BussinessHoursTable = ({
  getState,
  setState,
  obs,
}: IBussinessHoursTable): JSX.Element => {
  const [toggled, setToggled] = useState(false);
  const observable = obs();

  const handleToggle = () => {
    // The handleToggle function changes between true or false the status of the component in the local state
    // and in the Rx state
    setToggled(!toggled);
    const state = getState();
    state.toggle();
    setState({
      ...state,
      activeToggle: !state.activeToggle,
    });
  };

  useEffect(() => {
    // This useEffect update the Toggled button status with the observable
    const aux = observable.subscribe((data) => {
      setToggled(data.activeToggle);
    });
    return () => aux.unsubscribe();
  }, [observable]);

  return (
    <div className='hoursTable'>
      <SectionTitle text='Horarios de Atención' />
      <TableHeaders />
      {Object.values(days).map((day, i) => (
        <DailyHours
          key={i}
          day={day}
          schedule={getState().schedule.find((el) => el.day === day)}
          toggled={toggled} // This property refers to the status of the toggle button
          checked={
            getState().schedule.find((el) => el.day === day) !== undefined
          } // This property refers to the status of checkbox for each day
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
