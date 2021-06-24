import React from 'react';
import { CloseWindowsXButton } from '../../../components/formUtils';
import { WhiteButton } from '../../../components/formUtils/';
import { IRender } from '../../../models/rxjsInterfaces';
import { getStateExpert, setStateExpert } from '../../../services/step5';

const RenderExpert = ({
  name,
  phone,
  email,
  services,
  dailyHours,
  expertKey,
  handleEdit,
}: IRender) => {
  const handleClickClose = () => {
    const state = getStateExpert();
    delete state[expertKey];
    setStateExpert(state);
  };
  const aux = services.join(', ');

  return (
    <div className='renderExpert'>
      <div style={{ width: '55%' }}>
        <div className='nameExpert'>{name}</div>
        <div className='bodyExpert'>{phone}</div>
        <div className='bodyExpert'>{email}</div>
        <div style={{ display: 'flex' }}>
          <div className='bodyExpert'>{aux}</div>
        </div>
        {dailyHours.map((day, i) => {
          return (
            <div className='contianerHours' key={i}>
              <div>{day.day}: </div>
              <div style={{ display: 'flex' }}>
                <div>{day.open}- </div>
                <div>{day.close} </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='btnAndX'>
        <WhiteButton text='Editar' handleClick={() => handleEdit(expertKey)} />
        <CloseWindowsXButton handleClick={handleClickClose} />
      </div>
    </div>
  );
};

export default RenderExpert;
