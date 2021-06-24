import React, { useState, useEffect } from 'react';
import {
  TitleText,
  StepsText,
  Button,
  LabelTextComponent,
} from '../../../components/formUtils';
import { ButtonExpert } from '../../../components/formUtils/';
import RenderExpert from './RenderExpert.component';
import { IProps } from '../../../models/rxjsInterfaces';
import { getStateExpert, stateObservableExpert } from '../../../services/step5';
import {
  getGlobalState,
  setGlobalState,
} from '../../../services/globalConfigState';
import { BackNavBar } from '../../../components/appUtils/';
import { setPostData } from '../../../services/firebase';
import { useHistory } from 'react-router';

const ExpertScreen = (props: IProps): JSX.Element => {
  const observable = stateObservableExpert();
  const [obj, setObj] = useState(Object.entries(getStateExpert()));
  const [valid, setValid] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const subscription = observable.subscribe((data) => {
      setObj(Object.entries(data));
      Object.entries(data).length ? setValid(true) : setValid(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async () => {
    const state = getStateExpert();
    setGlobalState({
      ...getGlobalState(),
      stepExperts: state,
    });
    const {
      stepBusinessHours,
      stepServices,
      stepPrices,
      stepSalonDetail,
      stepExperts,
    } = getGlobalState();

    const step1 = {
      schedule: stepBusinessHours?.schedule,
      neighborhoods: stepBusinessHours?.neighborhoods,
      type: stepBusinessHours?.type,
      appointmentTime: stepBusinessHours?.appointmentTime,
    };

    const arrayStep5 = [];
    for (const expert in stepExperts) {
      if (stepExperts[expert]) {
        arrayStep5.push(stepExperts[expert]);
      }
    }

    const step5 = arrayStep5.map((el) => {
      return {
        ExpertEmail: el.ExpertEmail,
        ExpertName: el.ExpertName,
        ExpertPhone: el.ExpertPhone,
        schedule: el.schedule,
        services: el.services,
      };
    });

    await setPostData({
      step1,
      stepServices,
      stepPrices,
      stepSalonDetail,
      step5,
    });

    history.push('/');
    // Falta validar que haya al menos 1 especialista y pushear a la pagina de home
  };

  return (
    <div className='expertScreenContainer'>
      <BackNavBar />
      <StepsText text='Paso 5 de 5' />
      <div className='expertTitle'>
        <TitleText text='¿Qué especialistas estarán atendiendo?' />
      </div>
      <h4 className='subtitleText'>
        Podrás asignarles servicios y horarios de atención
      </h4>

      <div className='labelExpert'>
        <LabelTextComponent text='Especialistas creados' />
      </div>
      <br />

      <div className='renderExpertContainer'>
        {!props.show &&
          obj.map((exp, i) => (
            <RenderExpert
              name={exp[1].ExpertName}
              phone={exp[1].ExpertPhone}
              email={exp[1].ExpertEmail}
              services={exp[1].services}
              dailyHours={exp[1].schedule}
              expertKey={exp[0]}
              handleEdit={props.handleEdit}
              key={i}
            />
          ))}
      </div>

      <div className='buttonsContainer'>
        <div className='buttonCreate'>
          <ButtonExpert handleClick={props.handleClick} />
          <Button
            text='Finalizar configuración'
            handleSubmit={handleSubmit}
            isValid={valid}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpertScreen;
