import React, { useState, useEffect } from 'react';
import { HourInput } from '../../../components/formUtils/';
import { DayLabel } from '../../../components/texts/';
import { getStateExpert, setStateExpert } from '../../../services/step5';
import { IDay } from '../../../models';
import { keys } from '../../../models/enums';
import { CustomCheckbox } from '../../../components/checkboxes';

/**
 * PROPS
 * @schdule : {day:string, open:string, close:string}
 * @day : string
 * @toggled :boolean
 * @checked : boolean
 * @expertName : string
 */

// Rx = step1(page), type, day

// This component shows the hour inputs and the checkbox for each day

const DailyHours = ({
  schedule,
  day,
  toggled,
  checked,
  expertName,
}: IDay): JSX.Element => {
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
    const state = getStateExpert();
    const schedule = expertName
      ? state[expertName].schedule
          .filter((obj) => obj.day !== day)
          .concat({
            day,
            ...hours,
            [name]: value,
          })
          .sort((a, b) => keys.indexOf(a.day) - keys.indexOf(b.day))
      : [];
    if (activeCheckBox) {
      expertName
        ? setStateExpert({
            ...state,
            [expertName]: {
              ...state[expertName],
              schedule: schedule,
              activeToggle: false,
            },
          })
        : null;
    }
    setHours({
      ...hours,
      [name]: value,
    });
  };

  const handleCheckboxClick = (e: boolean) => {
    // This handler set the hour input according to the status of the toggle and change the local status and
    // the Rx status of the daily hours
    const checked = e;
    const state = getStateExpert();
    const newHours = expertName
      ? state[expertName].activeToggle && state[expertName].schedule[0]
        ? state[expertName].schedule[0]
        : hours
      : {};
    const addSchedule = expertName
      ? state[expertName].schedule
          .concat({
            ...newHours,
            day,
          })
          .sort((a, b) => keys.indexOf(a.day) - keys.indexOf(b.day))
      : [];
    const removeSchedule = expertName
      ? state[expertName].schedule
          .filter((obj) => obj.day !== day)
          .sort((a, b) => keys.indexOf(a.day) - keys.indexOf(b.day))
      : [];
    expertName
      ? setStateExpert({
          ...state,
          [expertName]: {
            ...state[expertName],
            schedule: checked ? addSchedule : removeSchedule,
          },
        })
      : null;
    setHours(newHours);

    checked ? setActiveCheckBox(true) : setActiveCheckBox(false);
  };

  return (
    <div className='dailyHours'>
      <CustomCheckbox
        handleCheck={handleCheckboxClick}
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
