import React, { useState, useEffect } from 'react';
import { HourInput } from '../../../components/formUtils/';
import { DayLabel } from '../../../components/texts/';
import { getStateSch, setStateSch } from '../../../services/step1';
import { IDay } from '../../../models';
import { daysKeys } from '../../../models/enums';
import { ISchedules } from '../../../models/components.interfaces';
import { CustomCheckbox } from '../../../components/checkboxes';

/**
 * PROPS
 * @schdule : {day:string, open:string, close:string}
 * @day : string
 * @toggled :boolean
 * @checked : boolean
 */

// Rx = step1(page), type, day

// This component shows the hour inputs and the checkbox for each day

const DailyHours = ({ schedule, day, toggled, checked }: IDay): JSX.Element => {
  const [activeCheckBox, setActiveCheckBox] = useState(!!checked);
  const [hours, setHours] = useState<any>({
    open: schedule?.open || '07:00',
    close: schedule?.close || '17:00',
  });

  useEffect(() => {
    // This useEffect update the hour inputs according to the status of the toggle button
    if (toggled) {
      setHours({
        open: schedule ? schedule.open : '07:00',
        close: schedule ? schedule.close : '17:00',
      });
    }
  }, [toggled]);

  const handleInputChange = (name: string, value: string) => {
    // This handler set the hour inputs when you change it manually and also set the toggle button to false
    const state = getStateSch();
    const schedule = state.schedule
      .filter((obj) => obj.day !== day)
      .concat({
        ...hours,
        day,
        [name]: value,
      })
      .sort((a, b) => daysKeys.indexOf(a.day) - daysKeys.indexOf(b.day));
    if (activeCheckBox) {
      setStateSch({
        ...state,
        schedule: schedule,
        activeToggle: false,
      });
    }
    setHours({
      ...hours,
      [name]: value,
    });
  };

  const handleClickCheckBox = (e: boolean) => {
    // This handler set the hour input according to the status of the toggle and change the local status and
    // the Rx status of the daily hours
    const checked = e;
    const state = getStateSch();
    const newHours: ISchedules =
      state.activeToggle && state.schedule[0] ? state.schedule[0] : hours;
    const addSchedule = state.schedule
      .concat({
        ...newHours,
        day,
      })
      .sort((a, b) => daysKeys.indexOf(a.day) - daysKeys.indexOf(b.day));
    const removeSchedule = state.schedule
      .filter((obj) => obj.day !== day)
      .sort((a, b) => daysKeys.indexOf(a.day) - daysKeys.indexOf(b.day));

    setHours(newHours);
    setStateSch({
      ...state,
      schedule: checked ? addSchedule : removeSchedule,
    });

    checked ? setActiveCheckBox(true) : setActiveCheckBox(false);
  };

  return (
    <div className='dailyHours'>
      <CustomCheckbox
        handleCheck={handleClickCheckBox}
        checked={activeCheckBox}
      />
      <DayLabel day={day} active={activeCheckBox} />
      <HourInput
        active={activeCheckBox} // This property refers to the status of the checkbox
        name='open'
        value={hours.open}
        handleInputChange={handleInputChange}
      />
      <HourInput
        active={activeCheckBox} // This property refers to the status of the checkbox
        name='close'
        value={hours.close}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default DailyHours;
