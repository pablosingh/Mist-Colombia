import React from 'react';
import { PartnerType } from '../../models/enums';

interface IappointmentInfoProps {
  userType: string;
  hour: string;
  day?: string;
  clientName: string;
  expertName?: string;
  location?: string;
  service: string;
  subService: string;
}

/**
 * PROPS
 * @userType string,
 * @hour string,
 * @clientName string,
 * @expertName ? string,
 * @location ? string,
 * @service string,
 * @subService string
 */

const AppointmentInfo = (props: IappointmentInfoProps): JSX.Element => {
  return (
    <div className='appointmentInfo'>
      {props.day ? (
        <span className='appointmentWeekInfoText'>
          {props.hour} {props.day}
        </span>
      ) : (
        <span className='appointmentInfoText'>
          {props.hour} - {props.clientName}
        </span>
      )}
      <span className='appointmentInfoText'>{props.subService}</span>
      <div className='appointmentInfoSubtext'>
        {props.userType === PartnerType.INDEPENDENT
          ? props.location
          : props.expertName
          ? props.expertName
          : null}
      </div>
    </div>
  );
};

export default AppointmentInfo;
